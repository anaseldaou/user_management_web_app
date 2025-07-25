import { Routes } from '@angular/router';
import { usersRoutes } from './users/users.routes';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  usersRoutes
];
