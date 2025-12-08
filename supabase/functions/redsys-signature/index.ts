import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode as base64Encode, decode as base64Decode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Validation schema
interface PaymentRequest {
  service: string;
  price: string;
  name: string;
  email: string;
  phone: string;
}

function validatePaymentRequest(data: unknown): { valid: boolean; error?: string; data?: PaymentRequest } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const { service, price, name, email, phone } = data as Record<string, unknown>;

  // Validate service
  if (typeof service !== 'string' || service.trim().length === 0 || service.length > 200) {
    return { valid: false, error: 'Invalid service name' };
  }

  // Validate price format (e.g., "750,00 €" or "1.500,00 €")
  if (typeof price !== 'string' || !/^\d{1,3}(\.\d{3})*(,\d{2})?\s*€?$/.test(price.trim())) {
    return { valid: false, error: 'Invalid price format' };
  }

  // Validate name
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100) {
    return { valid: false, error: 'Name must be between 2 and 100 characters' };
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== 'string' || !emailRegex.test(email) || email.length > 255) {
    return { valid: false, error: 'Invalid email address' };
  }

  // Validate phone (optional but if provided must be valid)
  if (phone !== undefined && phone !== '' && (typeof phone !== 'string' || !/^[\d\s+\-()]{6,20}$/.test(phone))) {
    return { valid: false, error: 'Invalid phone number' };
  }

  return {
    valid: true,
    data: {
      service: service.trim(),
      price: price.trim(),
      name: name.trim(),
      email: email.trim(),
      phone: typeof phone === 'string' ? phone.trim() : ''
    }
  };
}

// HMAC-SHA256 implementation for Deno
async function hmacSha256(key: Uint8Array, message: Uint8Array): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, message);
  return new Uint8Array(signature);
}

// 3DES encryption for Redsys
async function encrypt3DES(key: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
  // Redsys uses 3DES-CBC with zero IV
  // We need to use a polyfill or implement 3DES since Web Crypto doesn't support it directly
  // For Redsys, we'll use a simplified approach that matches their expected format
  
  // Import the 3DES implementation
  const iv = new Uint8Array(8); // Zero IV
  
  // Pad key to 24 bytes for 3DES
  const paddedKey = new Uint8Array(24);
  paddedKey.set(key.slice(0, Math.min(key.length, 24)));
  if (key.length < 24) {
    paddedKey.set(key.slice(0, 24 - key.length), key.length);
  }
  
  // Pad data to multiple of 8 bytes
  const blockSize = 8;
  const paddedLength = Math.ceil(data.length / blockSize) * blockSize;
  const paddedData = new Uint8Array(paddedLength);
  paddedData.set(data);
  
  // Since Web Crypto API doesn't support 3DES, we'll use a pure JS implementation
  return des3Encrypt(paddedKey, paddedData, iv);
}

// Simple DES implementation for 3DES
function des3Encrypt(key: Uint8Array, data: Uint8Array, iv: Uint8Array): Uint8Array {
  // This is a simplified implementation - for production, consider using a crypto library
  // Redsys specifically uses 3DES-CBC
  
  const PC1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18,
    10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36,
    63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22,
    14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];

  const PC2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10,
    23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2,
    41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48,
    44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];

  const IP = [58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8,
    57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7];

  const FP = [40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31,
    38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29,
    36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27,
    34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25];

  const E = [32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9,
    8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16, 17,
    16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25,
    24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1];

  const SBOXES = [
    [[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
      [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
      [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
      [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]],
    [[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
      [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
      [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
      [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]],
    [[10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
      [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
      [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
      [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]],
    [[7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
      [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
      [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
      [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]],
    [[2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
      [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
      [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
      [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]],
    [[12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
      [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
      [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
      [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]],
    [[4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
      [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
      [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
      [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]],
    [[13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
      [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
      [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
      [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]]
  ];

  const P = [16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10,
    2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25];

  const SHIFTS = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

  function permute(input: number[], table: number[]): number[] {
    return table.map(i => input[i - 1]);
  }

  function leftShift(arr: number[], n: number): number[] {
    return arr.slice(n).concat(arr.slice(0, n));
  }

  function xor(a: number[], b: number[]): number[] {
    return a.map((v, i) => v ^ b[i]);
  }

  function bytesToBits(bytes: Uint8Array): number[] {
    const bits: number[] = [];
    for (const byte of bytes) {
      for (let i = 7; i >= 0; i--) {
        bits.push((byte >> i) & 1);
      }
    }
    return bits;
  }

  function bitsToBytes(bits: number[]): Uint8Array {
    const bytes = new Uint8Array(bits.length / 8);
    for (let i = 0; i < bytes.length; i++) {
      let byte = 0;
      for (let j = 0; j < 8; j++) {
        byte = (byte << 1) | bits[i * 8 + j];
      }
      bytes[i] = byte;
    }
    return bytes;
  }

  function generateKeys(key: Uint8Array): number[][] {
    const keyBits = bytesToBits(key.slice(0, 8));
    let permutedKey = permute(keyBits, PC1);
    let left = permutedKey.slice(0, 28);
    let right = permutedKey.slice(28);
    const keys: number[][] = [];

    for (let i = 0; i < 16; i++) {
      left = leftShift(left, SHIFTS[i]);
      right = leftShift(right, SHIFTS[i]);
      keys.push(permute(left.concat(right), PC2));
    }
    return keys;
  }

  function desBlock(block: number[], keys: number[], encrypt: boolean): number[] {
    let permuted = permute(block, IP);
    let left = permuted.slice(0, 32);
    let right = permuted.slice(32);

    const keyOrder = encrypt ? keys : [...keys].reverse();

    for (let i = 0; i < 16; i++) {
      const expanded = permute(right, E);
      const xored = xor(expanded, keyOrder[i]);
      
      const sboxOutput: number[] = [];
      for (let j = 0; j < 8; j++) {
        const chunk = xored.slice(j * 6, (j + 1) * 6);
        const row = (chunk[0] << 1) | chunk[5];
        const col = (chunk[1] << 3) | (chunk[2] << 2) | (chunk[3] << 1) | chunk[4];
        const val = SBOXES[j][row][col];
        for (let k = 3; k >= 0; k--) {
          sboxOutput.push((val >> k) & 1);
        }
      }
      
      const permutedSbox = permute(sboxOutput, P);
      const newRight = xor(left, permutedSbox);
      left = right;
      right = newRight;
    }

    return permute(right.concat(left), FP);
  }

  function desEncrypt(data: Uint8Array, key: Uint8Array, iv: Uint8Array): Uint8Array {
    const keys = generateKeys(key);
    const result = new Uint8Array(data.length);
    let prevBlock = bytesToBits(iv);

    for (let i = 0; i < data.length; i += 8) {
      const block = bytesToBits(data.slice(i, i + 8));
      const xored = xor(block, prevBlock);
      const encrypted = desBlock(xored, keys, true);
      const encryptedBytes = bitsToBytes(encrypted);
      result.set(encryptedBytes, i);
      prevBlock = encrypted;
    }

    return result;
  }

  function desDecrypt(data: Uint8Array, key: Uint8Array, iv: Uint8Array): Uint8Array {
    const keys = generateKeys(key);
    const result = new Uint8Array(data.length);
    let prevBlock = bytesToBits(iv);

    for (let i = 0; i < data.length; i += 8) {
      const block = bytesToBits(data.slice(i, i + 8));
      const decrypted = desBlock(block, keys, false);
      const xored = xor(decrypted, prevBlock);
      result.set(bitsToBytes(xored), i);
      prevBlock = block;
    }

    return result;
  }

  // 3DES: encrypt with K1, decrypt with K2, encrypt with K3
  const k1 = key.slice(0, 8);
  const k2 = key.slice(8, 16);
  const k3 = key.slice(16, 24);

  const step1 = desEncrypt(data, k1, iv);
  const step2 = desDecrypt(step1, k2, new Uint8Array(8));
  const step3 = desEncrypt(step2, k3, new Uint8Array(8));

  return step3;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    console.log('Received payment request');

    // Validate input
    const validation = validatePaymentRequest(body);
    if (!validation.valid) {
      console.error('Validation error:', validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { service, price, name, email, phone } = validation.data!;

    // Get secret key from environment
    const secretKey = Deno.env.get('REDSYS_SECRET_KEY');
    if (!secretKey) {
      console.error('REDSYS_SECRET_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Payment configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Redsys configuration
    const merchantCode = "992228353";
    const terminal = "1";
    const currency = "978"; // EUR
    const transactionType = "0"; // Authorization
    const merchantUrl = "https://rprbwlywuzcksapgyayl.supabase.co/functions/v1/redsys-notification";
    const urlOK = "https://andorratech.net/payment-success";
    const urlKO = "https://andorratech.net/payment-cancelled";

    // Generate order number
    const order = Date.now().toString().slice(-12);

    // Parse price (e.g., "750,00 €" -> 75000 cents)
    const priceClean = price.replace(/[^\d,]/g, '').replace(',', '.');
    const amountCents = Math.round(parseFloat(priceClean) * 100).toString();

    // Build merchant parameters
    const merchantParameters = {
      DS_MERCHANT_AMOUNT: amountCents,
      DS_MERCHANT_ORDER: order,
      DS_MERCHANT_MERCHANTCODE: merchantCode,
      DS_MERCHANT_CURRENCY: currency,
      DS_MERCHANT_TRANSACTIONTYPE: transactionType,
      DS_MERCHANT_TERMINAL: terminal,
      DS_MERCHANT_MERCHANTURL: merchantUrl,
      DS_MERCHANT_URLOK: urlOK,
      DS_MERCHANT_URLKO: urlKO,
      DS_MERCHANT_PRODUCTDESCRIPTION: `AndorraTech - ${service}`,
      DS_MERCHANT_TITULAR: name,
      DS_MERCHANT_MERCHANTDATA: JSON.stringify({ email, phone }),
    };

    // Base64 encode merchant parameters
    const merchantParamsJson = JSON.stringify(merchantParameters);
    const merchantParamsB64 = base64Encode(new TextEncoder().encode(merchantParamsJson));

    // Generate signature using 3DES + HMAC-SHA256
    const keyDecoded = base64Decode(secretKey);
    
    // Encrypt order with 3DES using the key
    const orderBytes = new TextEncoder().encode(order);
    const orderPadded = new Uint8Array(8);
    orderPadded.set(orderBytes.slice(0, 8));
    
    const encryptedKey = await encrypt3DES(keyDecoded, orderPadded);
    
    // HMAC-SHA256 of merchant parameters with encrypted key
    const merchantParamsBytes = new TextEncoder().encode(merchantParamsB64);
    const signature = await hmacSha256(encryptedKey, merchantParamsBytes);
    const signatureB64 = base64Encode(signature);

    console.log('Payment parameters generated successfully for order:', order);

    return new Response(
      JSON.stringify({
        Ds_SignatureVersion: "HMAC_SHA256_V1",
        Ds_MerchantParameters: merchantParamsB64,
        Ds_Signature: signatureB64,
        redsysUrl: "https://sis.redsys.es/sis/realizarPago"
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating payment signature:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
