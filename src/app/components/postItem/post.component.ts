import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { Comment } from 'src/app/models/Comment';
import { PostService } from '../../services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  public comments: Comment[] = [];
  public areCommentsShown: boolean = false;
  private commSub!: Subscription;
  @Input() post: Post;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
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
}
