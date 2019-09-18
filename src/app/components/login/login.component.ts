import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SecurityService } from '../../security/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngForm: FormGroup;

  constructor(private loginService: SecurityService,
              private router: Router,
              private fb: FormBuilder) {
              this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.ngForm = this.fb.group({
      email: ['',],
      password: ['',],
    });
  }
  onSubmit() {
    const data = {
      email: this.ngForm.get('email').value,
      password: this.ngForm.get('password').value,
    };
    this.loginService.login(data)
      .subscribe(results => {
        this.router.navigate(['/']);
      });
  }

}
