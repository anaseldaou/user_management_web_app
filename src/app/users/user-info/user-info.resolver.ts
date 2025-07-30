import { ResolveFn } from "@angular/router";
import { UserInfoModel, UserInfoResponseModel } from "../models/user-info.model";
import { inject } from "@angular/core";
import { UserService } from "../services/user.service";
import { map, Observable } from "rxjs";

export const userInfoResolver: ResolveFn<UserInfoModel | undefined> = (route, state): Observable<UserInfoModel | undefined> => {
  const usersService = inject(UserService);
  const userID = route.params['id'];
  return usersService.getUserByID(userID).pipe(map( res => res.body?.data));
};