import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostService } from '../../services/post.service';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CancelEvent,
  AddEvent,
  SaveEvent,
} from '@progress/kendo-angular-listview';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  public posts!: Post[];
  public userId!: number;
  public newPostId!: number;
  public formGroup!: FormGroup;
  private postsSub!: Subscription;
  private idSub!: Subscription;
  private createSub!: Subscription;

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.idSub = this.userService.userId$().subscribe((id) => {
      this.userId = id;
    });
    this.loadPosts();
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.idSub.unsubscribe();
    this.createSub.unsubscribe();
  }

  public loadPosts(): void {
    this.postsSub = this.postService
      .getPosts()
      .subscribe((postsResp: Post[]) => {
        this.newPostId = this.postService.generateIdForNewPost(postsResp);
        this.posts = postsResp.filter(
          (post: Post) => post.userId == this.userId
        );
        this.loadMore();
      });
  }

  public loadMore(): void {
    const next = this.posts.length || 0;
    this.posts = [...this.posts, ...this.posts.slice(next, next + 5)];
  }

  cancelHandler({ sender, itemIndex }: CancelEvent): void {
    sender.closeItem(itemIndex);
  }

  saveHandler({ sender, itemIndex, formGroup }: SaveEvent): void {
    const post: Post = formGroup.value;
    this.createSub = this.postService.createNewPost(post).subscribe(() => {
      this.loadPosts();
      this.posts.push(post);
      sender.closeItem(itemIndex);
    });
  }

  addHandler({ sender }: AddEvent) {
    this.formGroup = new FormGroup({
      userId: new FormControl(+this.userId),
      id: new FormControl(this.newPostId),
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
    sender.addItem(this.formGroup);
  }
}
