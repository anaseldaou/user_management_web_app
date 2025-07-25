import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserListModel } from '../models/user-list.model';
import { environment } from '../../../environments/environment';
import { UserInfoResponseModel } from '../models/user-info.model';
import { HttpBaseClass } from '../../shared/services/http-base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpBaseClass {
  baseUrl: string;
  constructor() {
    super();
    this.baseUrl = environment.baseUrl;
  }

  public getUserList(page: number): Observable<HttpResponse<UserListModel>>{
    return this.get<UserListModel>(`${this.baseUrl}users?page=${page}`);
  }

  public getUserByID(id: number): Observable<HttpResponse<UserInfoResponseModel>>{
    return this.get<UserInfoResponseModel>(`${this.baseUrl}users/${id}`);
  }
}
