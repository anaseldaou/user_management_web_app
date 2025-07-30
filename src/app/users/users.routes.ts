import { Route } from "@angular/router";
import { UserInfoComponent } from "./user-info/user-info.component";
import { UserListComponent } from "./user-list/user-list.component";
import { usersResolver } from "./user-list/user-list.resolver";
import { userInfoResolver } from "./user-info/user-info.resolver";

export const usersRoutes: Route = { 
    path: 'users', children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', resolve: { users: usersResolver } , loadComponent: () => UserListComponent },
        { path: ':id', resolve: { userInfo: userInfoResolver } ,loadComponent: () => UserInfoComponent }
    ]
  };