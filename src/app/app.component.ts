import { Component } from '@angular/core';
import { SecurityService } from './security/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-auth';

  constructor(private securityService: SecurityService, ) { }

  ngOnInit() {
    this.isAuthenticated();
  }

  isAuthenticated(): boolean {
    if (!this.securityService.isLoggedIn()) {
      return false;
    }
    return true;
  }

  logout(): void {
    this.securityService.logout();
  }

}
