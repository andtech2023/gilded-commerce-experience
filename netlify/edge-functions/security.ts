import type { Context } from "https://edge.netlify.com";

// Rate limiting storage (in-memory, resets on cold start)
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

// Blocked User-Agent patterns (case-insensitive)
const BLOCKED_USER_AGENTS = [
  'python', 'curl', 'go-http', 'scrapy', 'wget', 'httpclient', 'libwww',
  'httpunit', 'nutch', 'phpcrawl', 'msnbot', 'jyxobot', 'fast-webcrawler',
  'fast enterprise crawler', 'biglotron', 'teoma', 'convera', 'gigablast',
  'ia_archiver', 'webcopier', 'httrack', 'grub', 'netresearchserver',
  'speedy', 'fluffy', 'findlink', 'panscient', 'zyborg', 'accoona',
  'ccbot', 'ahrefs', 'semrush', 'dotbot', 'petalbot', 'bytespider',
  'claudebot', 'gptbot', 'dataforseo', 'megaindex', 'blexbot', 'mj12bot',
  'aspiegelbot',
];

// Blocked file extensions (WordPress/config attacks)
const BLOCKED_EXTENSIONS = [
  '.php', '.json', '.asp', '.aspx', '.jsp', '.cgi', '.pl',
  '.sql', '.bak', '.backup', '.old', '.orig', '.save', '.swp',
  '.config', '.ini', '.log', '.xml', '.yml', '.yaml'
];

// Blocked paths (WordPress, config files, common attack vectors)
const BLOCKED_PATHS = [
  '/wp-', '/wordpress', '/wp/', '/shop/', '/cart/', '/checkout/',
  '/wp-admin', '/wp-login', '/wp-content', '/wp-includes', '/xmlrpc',
  '/.env', '/.git', '/.vscode', '/.idea', '/.svn', '/.htaccess',
  '/phpmyadmin', '/phpinfo', '/adminer', '/mysql', '/pma/',
  '/admin.php', '/login.php', '/install.php', '/setup.php',
  '/config/', '/backup/', '/dump/', '/debug/', '/test/',
  '/cgi-bin/', '/scripts/', '/bin/', '/includes/',
  '/woocommerce', '/product/', '/products/', '/add-to-cart',
  '/rest/', '/api/wp', '/owa/', '/autodiscover',
];

// Blocked query parameters (WooCommerce, WordPress REST API)
const BLOCKED_PARAMS = [
  'product_brand', 'rest_route', 'wp_', 'wc-ajax', 'add-to-cart',
  'product_cat', 'product_tag', 'orderby', 'pa_', 'filter_',
  'action=', 'doing_wp_cron', 'preview=true', 'preview_id',
];

// Rate limit config
const RATE_LIMIT_MAX_REQUESTS = 20;
const RATE_LIMIT_WINDOW_MS = 10000; // 10 seconds

// Minimal 403 response (under 200 bytes)
const BLOCKED_RESPONSE = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>403</title></head><body>Forbidden</body></html>`;

// Minimal 404 response (under 200 bytes)
const NOT_FOUND_RESPONSE = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>404</title></head><body>Not Found</body></html>`;

function getClientIP(request: Request, context: Context): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  return context.ip || 'unknown';
}

function isBlockedUserAgent(userAgent: string | null): boolean {
  if (!userAgent || userAgent.trim() === '') {
    return true;
  }
  const lowerUA = userAgent.toLowerCase();
  return BLOCKED_USER_AGENTS.some(pattern => lowerUA.includes(pattern));
}

function hasBlockedExtension(pathname: string): boolean {
  const lowerPath = pathname.toLowerCase();
  return BLOCKED_EXTENSIONS.some(ext => lowerPath.endsWith(ext));
}

function hasBlockedPath(pathname: string): boolean {
  const lowerPath = pathname.toLowerCase();
  return BLOCKED_PATHS.some(blocked => lowerPath.includes(blocked));
}

function hasBlockedParams(search: string): boolean {
  const lowerSearch = search.toLowerCase();
  return BLOCKED_PARAMS.some(param => lowerSearch.includes(param));
}

function checkRateLimit(ip: string): { blocked: boolean; remaining: number } {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);
  
  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS
    });
    return { blocked: false, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }
  
  record.count++;
  
  if (record.count > RATE_LIMIT_MAX_REQUESTS) {
    return { blocked: true, remaining: 0 };
  }
  
  return { blocked: false, remaining: RATE_LIMIT_MAX_REQUESTS - record.count };
}

function cleanupOldEntries() {
  const now = Date.now();
  for (const [ip, record] of ipRequestCounts.entries()) {
    if (now > record.resetTime + 60000) {
      ipRequestCounts.delete(ip);
    }
  }
}

export default async function handler(request: Request, context: Context) {
  // Cleanup old entries occasionally
  if (Math.random() < 0.01) {
    cleanupOldEntries();
  }
  
  const clientIP = getClientIP(request, context);
  const userAgent = request.headers.get('user-agent');
  const url = new URL(request.url);
  const pathname = url.pathname;
  const search = url.search;
  
  // 1. Block dangerous file extensions FIRST (before any processing)
  if (hasBlockedExtension(pathname)) {
    console.log(`[Security] BLOCKED - Dangerous extension from ${clientIP}: ${pathname}`);
    return new Response(NOT_FOUND_RESPONSE, {
      status: 404,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': NOT_FOUND_RESPONSE.length.toString(),
        'X-Blocked-Reason': 'invalid-extension',
        'Connection': 'close'
      }
    });
  }
  
  // 2. Block WordPress/attack paths
  if (hasBlockedPath(pathname)) {
    console.log(`[Security] BLOCKED - Malicious path from ${clientIP}: ${pathname}`);
    return new Response(NOT_FOUND_RESPONSE, {
      status: 404,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': NOT_FOUND_RESPONSE.length.toString(),
        'X-Blocked-Reason': 'invalid-path',
        'Connection': 'close'
      }
    });
  }
  
  // 3. Block suspicious query parameters
  if (hasBlockedParams(search)) {
    console.log(`[Security] BLOCKED - Suspicious params from ${clientIP}: ${search}`);
    return new Response(BLOCKED_RESPONSE, {
      status: 403,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': BLOCKED_RESPONSE.length.toString(),
        'X-Blocked-Reason': 'invalid-params',
        'Connection': 'close'
      }
    });
  }
  
  // 4. Check User-Agent
  if (isBlockedUserAgent(userAgent)) {
    console.log(`[Security] BLOCKED - Bad User-Agent from ${clientIP}: ${userAgent}`);
    return new Response(BLOCKED_RESPONSE, {
      status: 403,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': BLOCKED_RESPONSE.length.toString(),
        'X-Blocked-Reason': 'invalid-user-agent',
        'Connection': 'close'
      }
    });
  }
  
  // 5. Check Rate Limit
  const rateLimitResult = checkRateLimit(clientIP);
  
  if (rateLimitResult.blocked) {
    console.log(`[Security] BLOCKED - Rate limit exceeded for ${clientIP}`);
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'Content-Type': 'text/plain',
        'Retry-After': '10',
        'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
        'X-RateLimit-Remaining': '0',
        'X-Blocked-Reason': 'rate-limit-exceeded',
        'Connection': 'close'
      }
    });
  }
  
  // 6. Allow request to continue
  const response = await context.next();
  
  const newHeaders = new Headers(response.headers);
  newHeaders.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString());
  newHeaders.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

export const config = {
  path: "/*"
};
