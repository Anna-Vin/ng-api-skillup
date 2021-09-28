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

  public filterCommentsByPost(comments: Comment[], postId: number): Comment[] {
    return comments.filter((comment) => comment.postId == postId);
  }

  public getPostInfo(postId: number): Observable<Post> {
    return this.http.get<Post>(`${environment.BASE_URL}/api/posts/${postId}`);
  }

  public updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(
      `${environment.BASE_URL}/api/posts/${post.id}`,
      post
    );
  }

  public deletePost(post: Post): Observable<Post> {
    return this.http.delete<Post>(
      `${environment.BASE_URL}/api/posts/${post.id}`
    );
  }

  public generateIdForNewPost(posts: Post[]): number {
    let newId: number = Math.round((1 + Math.random()) * 0x10000);
    if (posts.find((post) => post.id == newId)) {
      newId++;
    }
    return newId;
  }

  public createNewPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.BASE_URL}/api/posts`, post);
  }
}
