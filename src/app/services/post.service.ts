import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.BASE_URL}/api/posts`);
  }

  public getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.BASE_URL}/api/comments`);
  }

  public filterCommentsByPost(comments: Comment[], postId:number): Comment[] {
    return comments.filter((comment) => comment.postId == postId)
  }


}
