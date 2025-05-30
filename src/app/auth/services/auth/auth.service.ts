import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/api/";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(signupRequest: any): Observable<any>{
    return this.http.post(BASIC_URL + "auth/signup", signupRequest);
  }

  login(loginRequest: any): Observable<any>{
    return this.http.post(BASIC_URL + "auth/login", loginRequest);
  }


}
