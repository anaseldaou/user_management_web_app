import { Component, inject, signal, WritableSignal, computed, Signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from './shared/shared/shared.module';
import { LanguageService } from './shared/services/language.service';
import { Direction } from '@angular/cdk/bidi';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        MatToolbar,
        MatButton,
        MatMiniFabButton,
        MatSidenav,
        MatSidenavContainer,
        MatSidenavContent,
        MatIcon,
        MatNavList,
        TranslateModule,
        MatMenuModule,
        MatTooltipModule,
        SharedModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'user_management_web_app';
  languageService = inject(LanguageService);

  // Use signal-based current language
  currentLang: Signal<string> = this.languageService.currentLanguage$;
  currentLanguageObject: Signal<any> = this.languageService.currentLanguageObject;
  currentDirection: Signal<Direction | "auto"> = this.languageService.currentDirection;
  isRTL: Signal<boolean> = this.languageService.isRTL;

  constructor() {
    // Language initialization is handled by LanguageService
  }

  changeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
}
