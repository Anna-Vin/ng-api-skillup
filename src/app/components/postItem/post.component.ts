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
  private commSub!: Subscription;
  @Input() post: Post;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getComments().subscribe((commResp) => {
      this.comments = this.postService.filterCommentsByPost(commResp, this.post.id);
    });
  }

  ngOnDestroy(): void {
    this.commSub.unsubscribe();
  }

}
