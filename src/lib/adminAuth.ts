// Edge & Node.js compatible Admin Session Authentication using Web Crypto API

export const ADMIN_COOKIE_NAME = "gs_admin_session";
const SECRET_KEY =
  process.env.ADMIN_SESSION_SECRET ||
  "gs-collection-secure-secret-key-2026-9876543210";

// Base64Url Helpers
function toBase64Url(str: string): string {
  if (typeof btoa === "function") {
    return btoa(str)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(base64Url: string): string {
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  if (typeof atob === "function") {
    return atob(base64);
  }
  return Buffer.from(base64, "base64").toString("utf-8");
}

async function getHmacKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET_KEY),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export interface AdminSessionPayload {
  email: string;
  role: "ADMIN";
  exp: number; // Unix timestamp in ms
}

/**
 * Creates a cryptographically signed HMAC token for the admin session
 */
export async function createAdminSessionToken(email: string): Promise<string> {
  const payload: AdminSessionPayload = {
    email: email.toLowerCase(),
    role: "ADMIN",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const payloadStr = JSON.stringify(payload);
  const payloadB64 = toBase64Url(payloadStr);

  const enc = new TextEncoder();
  const key = await getHmacKey();
  const sigBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(payloadB64)
  );

  // Convert signature bytes to base64url
  const sigBytes = new Uint8Array(sigBuffer);
  let binary = "";
  for (let i = 0; i < sigBytes.byteLength; i++) {
    binary += String.fromCharCode(sigBytes[i]);
  }
  const sigB64 = toBase64Url(binary);

  return `${payloadB64}.${sigB64}`;
}

/**
 * Verifies the HMAC token signature and expiration
 */
export async function verifyAdminSessionToken(
  token: string | null | undefined
): Promise<{ valid: boolean; payload?: AdminSessionPayload }> {
  if (!token || typeof token !== "string") {
    return { valid: false };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false };
  }

  const [payloadB64, sigB64] = parts;

  try {
    const key = await getHmacKey();
    const enc = new TextEncoder();

    // Decode signature
    const binary = fromBase64Url(sigB64);
    const sigBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      sigBytes[i] = binary.charCodeAt(i);
    }

    // Verify signature with Web Crypto
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      enc.encode(payloadB64)
    );

    if (!isValid) {
      return { valid: false };
    }

    // Parse and validate payload
    const payloadStr = fromBase64Url(payloadB64);
    const payload: AdminSessionPayload = JSON.parse(payloadStr);

    if (payload.role !== "ADMIN" || payload.exp < Date.now()) {
      return { valid: false };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}
