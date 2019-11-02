import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder} from '@angular/forms';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  ngForm: FormGroup;
  authorId: any;

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
      author_id: ['', ],
    });
  }
  onSubmit() {
    this.authorId = JSON.parse(localStorage.getItem('authorInfo'));
    const data = {
      title: this.ngForm.get('title').value,
      content: this.ngForm.get('content').value,
      author_id: this.authorId[0].id,
    };
    this.postsService.postEntity(data)
      .subscribe(results => {
        this.router.navigate(['/']);
      });
  }

}
