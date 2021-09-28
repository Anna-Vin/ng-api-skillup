import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { Comment } from 'src/app/models/Comment';
import { PostService } from '../../services/post.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CancelEvent,
  EditEvent,
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
  public formGroup!: FormGroup;
  public listPostDataSubject: BehaviorSubject<ListViewDataResult> =
    new BehaviorSubject({
      data: [] as Post[],
      total: 0,
    });
  private commSub!: Subscription;
  @Input() post: Post;

  constructor(private postService: PostService) {}

  get listPostData$(): Observable<ListViewDataResult> {
    return this.listPostDataSubject.asObservable();
  }

  ngOnInit(): void {
    this.listPostDataSubject.next({ data: [this.post], total: 1 });
  }

  ngOnDestroy(): void {
    this.commSub.unsubscribe();
  }

  public clickOnComment(): void {
    if (this.areCommentsShown) {
      return;
    } else {
      this.areCommentsShown = true;
      this.postService.getComments().subscribe((commResp) => {
        this.comments = this.postService.filterCommentsByPost(
          commResp,
          this.post.id
        );
      });
    }
  }

  editHandler({ sender, dataItem, itemIndex }: EditEvent): void {
    this.formGroup = new FormGroup({
      id: new FormControl(dataItem.id),
      userId: new FormControl(dataItem.userId),
      title: new FormControl(dataItem.title, Validators.required),
      body: new FormControl(dataItem.body, Validators.required),
    });

    sender.editItem(itemIndex, this.formGroup);
  }

  cancelHandler({ sender, itemIndex }: CancelEvent): void {
    sender.closeItem(itemIndex);
  }

  saveHandler({ sender, itemIndex, formGroup }: SaveEvent): void {
    const post: Post = formGroup.value;
    this.postService.updatePost(post).subscribe(() => {
      this.postService.getPostInfo(post.id);
      this.listPostDataSubject.next({ data: [post], total: 1 });
      sender.closeItem(itemIndex);
    });
  }
}
