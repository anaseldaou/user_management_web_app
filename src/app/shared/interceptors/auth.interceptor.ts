import { HttpHandlerFn, HttpInterceptorFn } from "@angular/common/http";
import { HttpRequest, HttpEvent } from "@angular/common/module.d-CnjH8Dlt";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);  
  const reqWithHeader = req.clone({
        headers: req.headers.set('X-API-KEY', authService.getToken())
    });
  return next(reqWithHeader);
}