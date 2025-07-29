import { Component, inject, Signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from './shared/shared/shared.module';
import { LanguageService } from './shared/services/language.service';
import { UserService } from './users/services/user.service';
import { Direction } from '@angular/cdk/bidi';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, catchError, filter } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

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
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        TranslateModule,
        MatMenuModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatCardModule,
        SharedModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'user_management_web_app';
  languageService = inject(LanguageService);
  LoadingBarService = inject(LoadingBarService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly translateService = inject(TranslateService);

  // Search functionality
  searchControl = new FormControl('');
  isSearching = false;
  searchResult: any = null;
  showSearchResult = false;
  userNotFound = false;

  // Use signal-based current language
  currentLang: Signal<string> = this.languageService.currentLanguage$;
  currentLanguageObject: Signal<any> = this.languageService.currentLanguageObject;
  currentDirection: Signal<Direction | "auto"> = this.languageService.currentDirection;
  isRTL: Signal<boolean> = this.languageService.isRTL;

  constructor() {
    // Language initialization is handled by LanguageService
    this.LoadingBarService.useRef('1');
    this.setupSearch();
  }

  changeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  clearSearchResults(): void {
    this.searchResult = null;
    this.showSearchResult = false;
    this.userNotFound = false;
  }

  navigateToUserDetails(userId: number): void {
    this.router.navigate(['/users', userId]);
    this.searchControl.setValue('', { emitEvent: false });
    this.clearSearchResults();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500), // Wait 500ms after user stops typing
      distinctUntilChanged(), // Only trigger if value actually changed
      switchMap(value => {
        // Clear previous results when search input changes
        this.clearSearchResults();
        const userId = Number(value?.trim());
        this.isSearching = true;
        return this.userService.getUserByID(userId).pipe(
          catchError(error => {
            // Show "not found" UI instead of snackbar
            this.userNotFound = true;
            return of(null);
          })
        );
      })
    ).subscribe(response => {
      this.isSearching = false;
      if (response && response.body) {
        this.searchResult = response.body.data;
        this.showSearchResult = true;
      }
    });
  }

  private showMessage(key: string): void {
    this.translateService.get(key).subscribe(message => {
      this.snackBar.open(message, '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    });
  }
}
