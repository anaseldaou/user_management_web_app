import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoModel } from '../models/user-info.model';
import { SharedModule } from '../../shared/shared/shared.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-info',
  imports: [
    SharedModule
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.sass'
})
export class UserInfoComponent {
  @Input() userInfo!: UserInfoModel;
  router: Router = inject(Router);
  translate: TranslateService = inject(TranslateService);

  constructor() {}

  goBack(): void {
    this.router.navigate(['/users/list']);
  }
}
