import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly secretKey = 'user-management-app-secret-key-2025'; // In production, this should come from environment

  constructor() { }

  /**
   * Encrypt a string using AES encryption
   * @param text - The text to encrypt
   * @returns Encrypted string
   */
  encrypt(text: string): string {
      const encrypted = CryptoJS.AES.encrypt(text, this.secretKey).toString();
      return encrypted;
  }

  /**
   * Decrypt an encrypted string
   * @param encryptedText - The encrypted text to decrypt
   * @returns Decrypted string
   */
  decrypt(encryptedText: string): string {
      const decrypted = CryptoJS.AES.decrypt(encryptedText, this.secretKey);
      const originalText = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!originalText) {
        throw new Error('Failed to decrypt: Invalid encrypted data or wrong key');
      }
      
      return originalText;
  }
}
