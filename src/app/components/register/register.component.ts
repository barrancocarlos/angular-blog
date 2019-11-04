import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthorsService } from '../../services/authors.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ngForm: FormGroup;

  constructor(private authorsService: AuthorsService,
    private router: Router,
    private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.ngForm = this.fb.group({
      name: ['',],
      last_name: ['',],
      email: ['',],
      password: ['',],
    });
  }
  onSubmit() {
    const data = {
      name: this.ngForm.get('name').value,
      last_name: this.ngForm.get('last_name').value,
      email: this.ngForm.get('email').value,
      password: this.ngForm.get('password').value,

    };
    this.authorsService.postEntity(data)
      .subscribe(results => {
        this.router.navigate(['/']);
      });
  }

}


