import { Injectable } from '@nestjs/common';

import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}

  public async getComments(postId: string): Promise<CommentEntity[]> {
    return this.commentRepository.findByPostId(postId);
  }
}
