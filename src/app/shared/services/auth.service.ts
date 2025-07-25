import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly cookieService = inject(CookieService);
  private readonly cryptoService = inject(CryptoService);
  private readonly API_KEY = 'reqres-free-v1';
  private readonly COOKIE_NAME = 'app_api_key';
  private readonly COOKIE_EXPIRY_DAYS = 30;

  constructor() {
    this.initializeApiKey();
  }

  /**
   * Initialize and store the encrypted API key in cookies
   */
  private initializeApiKey(): void {
      // Check if encrypted API key already exists in cookies
      if (!this.cookieService.check(this.COOKIE_NAME)) {
        // Encrypt and store the API key
        const encryptedKey = this.cryptoService.encrypt(this.API_KEY);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + this.COOKIE_EXPIRY_DAYS);
        this.cookieService.set(
          this.COOKIE_NAME, 
          encryptedKey, 
          expiryDate,
          '/', // path
          undefined, // domain
          true, // secure (only over HTTPS in production)
          'Strict' // sameSite
        );
      }
  }

  /**
   * Get the decrypted API token from cookies
   * @returns The decrypted API token
   */
  getToken(): string {
    try {
      const encryptedKey = this.cookieService.get(this.COOKIE_NAME);
      if (!encryptedKey) {
        this.initializeApiKey();
        return this.getToken(); // Recursive call after initialization
      }
      const decryptedKey = this.cryptoService.decrypt(encryptedKey);
      return decryptedKey;
    } catch (error) {
      // Fallback: reinitialize if decryption fails
      this.clearToken();
      this.initializeApiKey();
      return this.API_KEY; // Return the original key as fallback
    }
  }

  /**
   * Clear the stored API token from cookies
   */
  clearToken(): void {
    this.cookieService.delete(this.COOKIE_NAME, '/');
  }
}
