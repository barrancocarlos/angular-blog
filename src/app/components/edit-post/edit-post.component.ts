import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostResponse, PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  ngForm: FormGroup;
  singlePost: PostResponse;
  singlePostId: any;
  authorId: any;

  constructor(private postsService: PostsService,
              private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute, ) {
              this.createForm();
            }

  ngOnInit() {
    this.getSinglePost();
  }

  createForm() {
    this.ngForm = this.fb.group({
      title: ['', ],
      content: ['', ],
      author_id: ['', ],
    });
  }

  private getSinglePost() {
    this.authorId = JSON.parse(localStorage.getItem('authorInfo'));
    this.route.params.subscribe(params => {
      this.singlePostId = params['id'];
      this.postsService.getEntity(this.singlePostId)
        .subscribe(data => {
          this.singlePost = data;
          console.log(this.singlePost);
          this.ngForm.setValue({
            title: this.singlePost.title,
            content: this.singlePost.content,
            author_id: this.authorId[0].id,
          });
        });
    });
  }

  onSubmit() {
    const data = {
      title: this.ngForm.get('title').value,
      content: this.ngForm.get('content').value,
      author_id: this.authorId[0].id,
    };
    this.postsService.putEntity(this.singlePostId, data)
      .subscribe(res => {
        this.router.navigate(['myposts']);
      });
  }

}
