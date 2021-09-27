import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostService } from '../../services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  public posts!: Post[];
  public userId!: number;
  private postsSub!: Subscription;
  private idSub!: Subscription;

  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
    this.idSub = this.userService.userId$().subscribe((id) => {
      this.userId = id;
    })
    this.postsSub = this.postService.getPosts().subscribe((postsResp: Post[]) => {
      this.posts = postsResp.filter((post: Post) => post.userId == this.userId);
      this.loadMore();
    });
    
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.idSub.unsubscribe();
  }

  public loadMore(): void {
    const next = this.posts.length || 0;
    this.posts = [...this.posts, ...this.posts.slice(next, next + 5)];
  }

}
