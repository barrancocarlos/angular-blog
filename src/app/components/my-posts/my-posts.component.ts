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
  authorId: any;

  constructor(private postsService: PostsService,
    private authorsService: AuthorsService, ) { }

  listOfmypostsByAuthor: PostResponse[];

  ngOnInit() {
    // this.showPosts();
    this.getAuthorByUser();
    this.showPostsByAuthor();
  }

  private getAuthorByUser() {
    this.userId = JSON.parse(localStorage.getItem('currentUser'));
    this.authorsService.getEntityByUser(this.userId.userId)
      .subscribe(data => {
        this.singleAuthor = data;
        localStorage.setItem('authorInfo', JSON.stringify(data));
      });
  }

  private showPostsByAuthor() {
    this.authorId = JSON.parse(localStorage.getItem('authorInfo'));
    console.log(this.postsService);
    this.postsService.getEntitiesByAuthor(this.authorId[0].id)
      .subscribe(data => {
        this.listOfmypostsByAuthor = data;
      });
  }

  onDelete(id: any) {
    this.postsService.deleteEntity(id)
      .subscribe(() => {
        this.showPostsByAuthor();
      });
  }

}
