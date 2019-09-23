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
  
  logout(): void {
    this.securityService.logout();
  }

}
