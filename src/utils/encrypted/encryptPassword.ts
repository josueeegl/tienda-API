import crypto from "crypto";
import { promisify } from "util";

const randomBytesAsync = promisify(crypto.randomBytes);
const pbkdf2Async = promisify(crypto.pbkdf2);

export async function getKey(size: number): Promise<string> {
  const salt: Buffer = await randomBytesAsync(size);
  const newSalt: string = salt.toString("base64");
  return newSalt;
} 

export async function getEncryptePassword(
  password: string,
  salt?: string
): Promise<string> {
  const encryptedPasswordBuffer: Buffer = await pbkdf2Async(
    password,
    salt!, 
    10000,
    64,
    "sha1"
  );
  const encryptedPassword: string = encryptedPasswordBuffer.toString("base64");
  return encryptedPassword;
}
