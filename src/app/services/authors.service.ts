import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { GlobalService } from '../services/global.service';

export interface AuthorResponse {
  id: string;
  email: string;
  password: string;
  name: string;
  last_name: string;
  userId: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  uri = 'api/authors/';

  constructor(private http: HttpClient, private global: GlobalService) { }

  getEntities(): Observable<AuthorResponse[]> {
    return this.http
      .get<AuthorResponse[]>(this.global.BASE_URI + this.uri, { responseType: 'json' });
  }

  getEntityByUser(userId): Observable<AuthorResponse[]> {
    return this.http
      .get<AuthorResponse[]>(this.global.BASE_URI + this.uri + '?user_id=' + userId, { responseType: 'json' });
  }

  getEntity(id) {
    return this.http
      .get<AuthorResponse>(this.global.BASE_URI + this.uri + id, { responseType: 'json' });
  }

  postEntity(data) {
    return this.http
      .post<AuthorResponse>(this.global.BASE_URI + this.uri, data);
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
