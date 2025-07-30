import { HttpClient, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpBaseClass {
    private readonly httpClient: HttpClient;
    constructor(){
        this.httpClient = inject(HttpClient)
    }

    get<T>(url: string): Observable<HttpResponse<T>> {
        return this.httpClient.get<T>(url, { observe: 'response' });
    }

}