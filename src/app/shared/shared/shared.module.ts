import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';


@NgModule({
  declarations: [],
  exports:[
    RouterLink, 
    RouterLinkActive,
    MatToolbar,
    MatSidenavModule,
    MatIcon,
    MatNavList,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatButtonModule,
    TranslateModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
    CommonModule
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatCard,
    RouterLinkActive,
    MatToolbar,
    MatIcon,
    MatNavList,
    TranslateModule,
    LoadingBarModule
]
})
export class SharedModule { }
