import type { Context } from "https://edge.netlify.com";

// Rate limiting storage (in-memory, resets on cold start)
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

// Blocked User-Agent patterns (case-insensitive)
const BLOCKED_USER_AGENTS = [
  'python',
  'curl',
  'go-http',
  'scrapy',
  'wget',
  'httpclient',
  'libwww',
  'httpunit',
  'nutch',
  'phpcrawl',
  'msnbot',
  'jyxobot',
  'fast-webcrawler',
  'fast enterprise crawler',
  'biglotron',
  'teoma',
  'convera',
  'gigablast',
  'ia_archiver',
  'webcopier',
  'httrack',
  'grub',
  'netresearchserver',
  'speedy',
  'fluffy',
  'findlink',
  'panscient',
  'zyborg',
  'accoona',
  'ccbot',
  'ahrefs',
  'semrush',
  'dotbot',
  'petalbot',
  'bytespider',
  'claudebot',
  'gptbot',
  'dataforseo',
  'megaindex',
  'blexbot',
  'mj12bot',
  'aspiegelbot',
];

// Rate limit config
const RATE_LIMIT_MAX_REQUESTS = 20;
const RATE_LIMIT_WINDOW_MS = 10000; // 10 seconds

function getClientIP(request: Request, context: Context): string {
  // Try to get real IP from various headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  // Netlify provides client IP in context
  return context.ip || 'unknown';
}

function isBlockedUserAgent(userAgent: string | null): boolean {
  // Block empty User-Agent
  if (!userAgent || userAgent.trim() === '') {
    return true;
  }
  
  const lowerUA = userAgent.toLowerCase();
  
  // Check against blocked patterns
  return BLOCKED_USER_AGENTS.some(pattern => lowerUA.includes(pattern));
}

function checkRateLimit(ip: string): { blocked: boolean; remaining: number } {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);
  
  if (!record || now > record.resetTime) {
    // New window
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

// Cleanup old entries periodically (prevent memory leak)
function cleanupOldEntries() {
  const now = Date.now();
  for (const [ip, record] of ipRequestCounts.entries()) {
    if (now > record.resetTime + 60000) { // Clean entries older than 1 minute
      ipRequestCounts.delete(ip);
    }
  }
}

export default async function handler(request: Request, context: Context) {
  // Cleanup old entries occasionally
  if (Math.random() < 0.01) { // 1% chance per request
    cleanupOldEntries();
  }
  
  const clientIP = getClientIP(request, context);
  const userAgent = request.headers.get('user-agent');
  const url = new URL(request.url);
  
  // Log for monitoring (visible in Netlify Functions logs)
  console.log(`[Security] IP: ${clientIP}, UA: ${userAgent?.substring(0, 50) || 'empty'}, Path: ${url.pathname}`);
  
  // 1. Check User-Agent
  if (isBlockedUserAgent(userAgent)) {
    console.log(`[Security] BLOCKED - Bad User-Agent from ${clientIP}: ${userAgent}`);
    return new Response('Access Denied', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'X-Blocked-Reason': 'invalid-user-agent'
      }
    });
  }
  
  // 2. Check Rate Limit
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
        'X-Blocked-Reason': 'rate-limit-exceeded'
      }
    });
  }
  
  // 3. Allow request to continue with security headers added
  const response = await context.next();
  
  // Clone response to add headers
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
