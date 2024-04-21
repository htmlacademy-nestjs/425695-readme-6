import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CommentService } from './comment.service';
import { CommentRdo } from './rdo/comment.rdo';
import { fillDto } from '@project/shared/helpers';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Get('/')
  public async show(@Param('postId') postId: string) {
    const comments = await this.commentService.getComments(postId);
    return fillDto(CommentRdo, comments.map((comment) => comment.toPOJO()));
  }

  @Post('/')
  public async create(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.createComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }

}
