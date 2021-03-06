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
    return this.httpClient.post<{ token: string, userEmail: string, userId: string }>
      (this.global.BASE_URI + 'login/', { email, password }).pipe(tap(res => {
        localStorage.setItem('currentUser', JSON.stringify({ access_token: res.token, userEmail: res.userEmail, userId: res.userId }));
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');    
  }

  public isLoggedIn(): boolean {
    return (localStorage.getItem('currentUser') !== null);
  }

}
