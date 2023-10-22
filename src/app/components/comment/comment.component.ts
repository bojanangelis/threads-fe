import { Component, Input, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { Comment } from 'src/app/interface/comment.interface';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: Comment;
  isExpended = signal(false);
  isReplying = signal(false);
  commentService = inject(CommentService);
  nestedComments = signal<Comment[]>([]);

  nestedCommentsEffect = effect(() => {
    if (this.isExpended()) {
      this.commentService
        .getComments(this.comment._id)
        .subscribe((comments) => {
          this.nestedComments.set(comments);
        });
    }
  });

  toggleReplying() {
    this.isReplying.set(!this.isReplying());
    if (this.isReplying()) {
      this.isExpended.set(true);
    }
  }

  toggleExpanded() {
    this.isExpended.set(!this.isExpended());
  }
}
