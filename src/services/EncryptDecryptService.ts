import crypto from "crypto";

export class EncryptDecryptService {
    private algorithm: string;
    private key: Buffer;
    private ivLength: number;

    constructor() {
        this.algorithm = "aes-256-cbc";
        this.key = crypto.scryptSync("your-secret-key", "salt", 32); 
        this.ivLength = 16;  
    }

    encrypt(text: string): string {
        const iv = crypto.randomBytes(this.ivLength);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        let encrypted = cipher.update(text, "utf8", "hex");
        encrypted += cipher.final("hex");
        return iv.toString("hex") + ":" + encrypted;  
    }

    decrypt(text: string): string {
        const [ivHex, encryptedText] = text.split(":");
        const iv = Buffer.from(ivHex, "hex");
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
        let decrypted = decipher.update(encryptedText, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }
}


