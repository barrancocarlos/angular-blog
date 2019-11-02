import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { GlobalService } from '../services/global.service';

export interface PostResponse {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  author: any; // change when author response
  authorId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  uri = 'api/posts/';


  constructor(private http: HttpClient, private global: GlobalService) { }

  getEntities(): Observable<PostResponse[]> {
    return this.http
      .get<PostResponse[]>(this.global.BASE_URI + this.uri, { responseType: 'json' });
  }

  getEntitiesByAuthor(authorId): Observable<PostResponse[]> {
    return this.http
      .get<PostResponse[]>(this.global.BASE_URI + this.uri + '?author_id=' + authorId, { responseType: 'json' });
  }

  getEntity(id) {
    return this.http
      .get<PostResponse>(this.global.BASE_URI + this.uri + id, { responseType: 'json' });
  }

  postEntity(data) {
    return this.http
      .post<PostResponse>(this.global.BASE_URI + this.uri, data);
  }

  putEntity(id, data) {
    return this.http
      .put(this.global.BASE_URI + this.uri + id + '/', data);
  }
  deleteEntity(id) {
    return this.http
      .delete(this.global.BASE_URI + this.uri + id);
  }

}
