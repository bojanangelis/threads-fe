import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent {
  @Input() placeholder = 'Write something...';
  @Input() buttonText = 'Create';
  @Output() formSubmitted = new EventEmitter<{ text: string }>();

  formSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const commentText = form.elements.namedItem(
      'commentText'
    ) as HTMLTextAreaElement;
    const x = commentText.value;
    form.reset();
    this.formSubmitted.emit({ text: x });
  }
}
