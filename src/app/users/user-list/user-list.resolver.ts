import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserListModel } from '../models/user-list.model';
import { UserService } from '../services/user.service';

export const usersResolver: ResolveFn<UserListModel | null> = (route, state): Observable<UserListModel | null> => {
  const usersService = inject(UserService);
  const page = parseInt(route.queryParams['page']) || 1;
  return usersService.getUserList(page).pipe(map( res => res.body));
};