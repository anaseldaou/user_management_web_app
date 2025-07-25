import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  flag?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translateService = inject(TranslateService);
  private cookieService = inject(CookieService);

  private readonly LANGUAGE_COOKIE_KEY = 'preferred-language';
  private readonly COOKIE_EXPIRY_DAYS = 365; // 1 year
  private readonly DEFAULT_LANGUAGE = 'en';

  // Available languages
  public readonly availableLanguages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '��' }
  ];

  private currentLanguageSubject = new BehaviorSubject<string>(this.DEFAULT_LANGUAGE);
  public currentLanguage$: Observable<string> = this.currentLanguageSubject.asObservable();

  constructor() {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    // Set up available languages
    const languageCodes = this.availableLanguages.map(lang => lang.code);
    this.translateService.addLangs(languageCodes);
    this.translateService.setDefaultLang(this.DEFAULT_LANGUAGE);

    // Get saved language from cookie
    const savedLanguage = this.getSavedLanguage();
    this.setLanguage(savedLanguage);
  }

  /**
   * Get the current language
   */
  get currentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  /**
   * Set the application language
   */
  setLanguage(languageCode: string): void {
    if (!this.isLanguageSupported(languageCode)) {
      languageCode = this.DEFAULT_LANGUAGE;
    }

    this.translateService.use(languageCode);
    this.currentLanguageSubject.next(languageCode);
    this.saveLanguagePreference(languageCode);
  }

  /**
   * Toggle between available languages (useful for simple 2-language apps)
   */
  toggleLanguage(): void {
    const currentIndex = this.availableLanguages.findIndex(lang => lang.code === this.currentLanguage);
    const nextIndex = (currentIndex + 1) % this.availableLanguages.length;
    const nextLanguage = this.availableLanguages[nextIndex].code;
    this.setLanguage(nextLanguage);
  }

  /**
   * Get language from cookie
   */
  private getSavedLanguage(): string {
    const savedLanguage = this.cookieService.get(this.LANGUAGE_COOKIE_KEY);
    return savedLanguage && this.isLanguageSupported(savedLanguage) ? savedLanguage : this.DEFAULT_LANGUAGE;
  }

  /**
   * Save language preference to cookie
   */
  private saveLanguagePreference(languageCode: string): void {
    this.cookieService.set(
      this.LANGUAGE_COOKIE_KEY,
      languageCode,
      { 
        expires: this.COOKIE_EXPIRY_DAYS,
        path: '/',
        secure: true,
        sameSite: 'Strict'
      }
    );
  }

  /**
   * Check if a language is supported
   */
  private isLanguageSupported(languageCode: string): boolean {
    return this.availableLanguages.some(lang => lang.code === languageCode);
  }

  /**
   * Get language name by code
   */
  getLanguageName(languageCode: string): string {
    const language = this.availableLanguages.find(lang => lang.code === languageCode);
    return language ? language.name : languageCode;
  }

  /**
   * Get current language object
   */
  getCurrentLanguageObject(): Language {
    const currentLang = this.currentLanguage;
    return this.availableLanguages.find(lang => lang.code === currentLang) || this.availableLanguages[0];
  }
}
