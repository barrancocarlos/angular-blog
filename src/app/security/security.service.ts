import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../services/global.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient, private global: GlobalService) { }

  login(data) {
    return this.httpClient.post<{ token: string }>(this.global.BASE_URI + 'login/', { data }).pipe(tap(res => {
      localStorage.setItem('token', res.token);
    }));
  }

  // register(email: string, password: string) {
  //   return this.httpClient.post<{ token: string }>(this.global.BASE_URI + 'register/', { email, password }).pipe(tap(res => {
  //     this.login(email, password)
  //   }))
  // }

  logout() {
    localStorage.removeItem('token');
  }

  public get isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }


}
