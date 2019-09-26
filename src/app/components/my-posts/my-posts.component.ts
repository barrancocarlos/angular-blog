import { Component, OnInit } from '@angular/core';
import { AuthorResponse, AuthorsService } from '../../services/authors.service';
import { PostResponse, PostsService } from '../../services/posts.service';


@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  singleAuthor: AuthorResponse[];
  userId: any;

  constructor(private postsService: PostsService,
              private authorsService: AuthorsService, ) { }

  listOfmyposts: PostResponse[];

    ngOnInit() {
    this.showPosts();
    this.getAuthorByUser();
  }

  private showPosts() {
    console.log(this.postsService);
    this.postsService.getEntities()
      .subscribe(data => {
        this.listOfmyposts = data;
      });
  }

  private getAuthorByUser() {
    this.userId = JSON.parse(localStorage.getItem('currentUser'));
    this.authorsService.getEntityByUser(this.userId.userId)
      .subscribe(data => {
        this.singleAuthor = data;
      });
  }

  onDelete(id: any) {
    this.postsService.deleteEntity(id)
    .subscribe(() => {
      this.showPosts();
    });
  }

}
