import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostService } from '../../services/post.service';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
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
  public isUserExist!: boolean;
  public newPostId!: number;
  public formGroup!: FormGroup;
  private postsSub!: Subscription;
  private userSub!: Subscription;
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
    this.userSub = this.userService.isUserExist$().subscribe((isUserExist) => {
      this.isUserExist = isUserExist;
    })
    this.loadPosts();
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
    this.idSub?.unsubscribe();
    this.createSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }

  public loadPosts(): void {
    this.postService
      .getPosts()
      .pipe(map(posts => {
        return posts.filter(p => p.userId === Number(this.userId));
      }))
      .subscribe((postsResp: Post[]) => {
        this.newPostId = this.postService.generateIdForNewPost(postsResp);
        this.posts = postsResp;
      });
  }

  public cancelHandler({ sender, itemIndex }: CancelEvent): void {
    sender.closeItem(itemIndex);
  }

  public saveHandler({ sender, itemIndex, formGroup }: SaveEvent): void {
    const post: Post = formGroup.value;
    this.createSub = this.postService.createNewPost(post).subscribe(() => {
      this.loadPosts();
      sender.closeItem(itemIndex);
    });
  }

  public addHandler({ sender }: AddEvent) {
    this.formGroup = new FormGroup({
      userId: new FormControl(+this.userId),
      id: new FormControl(this.newPostId),
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
    sender.addItem(this.formGroup);
  }
}
