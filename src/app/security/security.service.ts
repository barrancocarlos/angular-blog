import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../services/global.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient, private global: GlobalService) { }

  login(email: string, password: string) {
    return this.httpClient.post<{ token: string }>
    (this.global.BASE_URI + 'login/', {email, password}).pipe(tap(res => {
      localStorage.setItem('access_token', res.token);
    }));
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get isLoggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }




}
