import crypto from "crypto";
import { env } from "../../config";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

const KEY = Buffer.from(env.ENCRYPTION_KEY, "hex");

if (KEY.length !== 32) {
  throw new Error(
    "ENCRYPTION_KEY must be exactly 32 bytes (64 hex characters)."
  );
}

/**
 * Encrypt plain text
 */
export function encrypt(text: string): string {
  if (!text) {
    return text;
  }

  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    iv.toString("hex"),
    authTag.toString("hex"),
    encrypted.toString("hex"),
  ].join(":");
}

/**
 * Decrypt encrypted text
 */
export function decrypt(encryptedText: string): string {
  if (!encryptedText) {
    return encryptedText;
  }

  const [ivHex, authTagHex, encryptedHex] =
    encryptedText.split(":");

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(ivHex, "hex")
  );

  decipher.setAuthTag(
    Buffer.from(authTagHex, "hex")
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}