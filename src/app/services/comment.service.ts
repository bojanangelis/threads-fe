import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { env } from '../environmen';
import { Comment } from '../interface/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  http = inject(HttpClient);

  getComments(parentId: string = '') {
    let url = `${env.apiBasedUrl}/comments`;
    if (parentId) {
      url += `?parentId=${parentId}`;
    }
    return this.http.get<Comment[]>(url);
  }
}
