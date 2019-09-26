import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostResponse, PostsService } from '../../services/posts.service';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  singlePost: PostResponse;
  singlePostId: any;


  constructor(private postsService: PostsService,
              private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.getSinglePost();
  }

  private getSinglePost() {
    this.route.params.subscribe(params => {
      this.singlePostId = params['id'];
      this.postsService.getEntity(this.singlePostId)
        .subscribe(data => {
          this.singlePost = data;
          console.table(this.singlePost);
        });
    });
  }

}


