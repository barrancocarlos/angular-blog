import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  ngForm: FormGroup;

  constructor(private postsService: PostsService,
              private router: Router,
              private fb: FormBuilder) { 
                this.createForm();
              }

  ngOnInit() {
  }

  createForm() {
    this.ngForm = this.fb.group({
      title: ['', ],
      content: ['', ],
      author: ['', ],
    });
  }
  onSubmit() {
    const data = {
      title: this.ngForm.get('title').value,
      content: this.ngForm.get('content').value,
      author: this.ngForm.get('author').value,
    };
    this.postsService.postEntity(data)
      .subscribe(results => {
        this.router.navigate(['/']);
      });
  }

}
