import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserListModel } from '../models/user-list.model';
import { UserService } from '../services/user.service';
import { SharedModule } from '../../shared/shared/shared.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, SharedModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.sass'
})
export class UserListComponent implements OnInit {

  @Input() users!: UserListModel;

  // Expose Math to template
  Math = Math;
  userService: UserService = inject(UserService);
  router: Router = inject(Router);
  translate: TranslateService = inject(TranslateService);

  constructor(
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }

  onPageChange(page: number): void {
    if (this.users && page >= 1 && page <= this.users.total_pages && page !== this.users.page) {

      this.userService.getUserList(page).subscribe(
        response => {
          if (response.body) {
            this.users = response.body;
          }
        }
      );
    }
  }

  getPaginationPages(): number[] {
    if (!this.users) {
      return [];
    }
    const pages: number[] = [];
    for (let i = 1; i <= this.users.total_pages; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToUserByID(userID: number): void {
    this.router.navigate(['/users', userID]);
  }
}
