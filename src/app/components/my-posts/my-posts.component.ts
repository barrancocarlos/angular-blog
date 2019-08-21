import { Component, OnInit } from '@angular/core';

import { PostResponse, PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  constructor(private postsService: PostsService) { }

  listOfmyposts: PostResponse[];

    ngOnInit() {
    this.showPosts();
  }

  private showPosts() {
    console.log(this.postsService);
    this.postsService.getEntities()
      .subscribe(data => {
        this.listOfmyposts = data;
      });
  }

  onDelete(id: any) {
    this.postsService.deleteEntity(id)
    .subscribe(() => {
      this.showPosts();
    });
  }

}
