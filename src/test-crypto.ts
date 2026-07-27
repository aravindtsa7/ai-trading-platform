import { encrypt, decrypt } from "./common/crypto";

const original = "MySuperSecret123";

const encrypted = encrypt(original);

const decrypted = decrypt(encrypted);

console.log("Original :", original);
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);