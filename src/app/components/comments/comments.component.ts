import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../models/Comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  @Input() comments: Comment[];
  @Input() areCommentsShown: boolean;
  @Input() areCommentsExist: boolean;
  @Output() onCommentsClick: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor() {}

  public clickOnComment(): void {
    this.onCommentsClick.emit(true);
  }
}
