import { Component, OnInit } from '@angular/core';

import { PostResponse, PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private postsService: PostsService) { }

  listOfposts: PostResponse[];

    ngOnInit() {
    this.showPosts();
  }

  private showPosts() {
    console.log(this.postsService);
    this.postsService.getEntities()
      .subscribe(data => {
        this.listOfposts = data;
      });
  }

}
