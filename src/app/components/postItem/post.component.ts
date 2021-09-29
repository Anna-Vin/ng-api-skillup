import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { Comment } from 'src/app/models/Comment';
import { PostService } from '../../services/post.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CancelEvent,
  EditEvent,
  RemoveEvent,
  ListViewDataResult,
  SaveEvent,
} from '@progress/kendo-angular-listview';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  public comments: Comment[] = [];
  public areCommentsShown: boolean = false;
  public areCommentsExist: boolean = true;
  public formGroup!: FormGroup;
  public listPostDataSubject: BehaviorSubject<ListViewDataResult> =
    new BehaviorSubject({
      data: [] as Post[],
      total: 0,
    });
  private commSub!: Subscription;
  private updSub!: Subscription;
  private delSub!: Subscription;
  @Input() post: Post;

  constructor(private postService: PostService) {}

  get listPostData$(): Observable<ListViewDataResult> {
    return this.listPostDataSubject.asObservable();
  }

  ngOnInit(): void {
    this.listPostDataSubject.next({ data: [this.post], total: 1 });
  }

  ngOnDestroy(): void {
    this.commSub?.unsubscribe();
    this.updSub?.unsubscribe();
    this.delSub?.unsubscribe();
  }

  public clickOnComment(): void {
    if (this.areCommentsShown) {
      return;
    } else {
      this.areCommentsShown = true;
      this.commSub = this.postService.getComments().subscribe((commResp) => {
        this.comments = this.postService.filterCommentsByPost(
          commResp,
          this.post.id
        );
        if (!this.comments.length) {
          this.areCommentsExist = false;
        }
      });
    }
  }

  public editHandler({ sender, dataItem, itemIndex }: EditEvent): void {
    this.formGroup = new FormGroup({
      id: new FormControl(dataItem.id),
      userId: new FormControl(dataItem.userId),
      title: new FormControl(dataItem.title, Validators.required),
      body: new FormControl(dataItem.body, Validators.required),
    });

    sender.editItem(itemIndex, this.formGroup);
  }

  public cancelHandler({ sender, itemIndex }: CancelEvent): void {
    sender.closeItem(itemIndex);
  }

  public saveHandler({ sender, itemIndex, formGroup }: SaveEvent): void {
    const post: Post = formGroup.value;
    this.updSub = this.postService.updatePost(post).subscribe(() => {
      this.postService.getPostInfo(post.id);
      this.listPostDataSubject.next({ data: [post], total: 1 });
      sender.closeItem(itemIndex);
    });
  }

  public removeHandler({ dataItem }: RemoveEvent): void {
    this.delSub = this.postService.deletePost(dataItem).subscribe(() => {
      this.listPostDataSubject.next({ data: [], total: 0 });
    });
  }
}
