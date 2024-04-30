import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { CommentValidateMessage } from '../comment.constants';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: CommentValidateMessage.MESSAGE_IS_EMPTY })
  public message: string;

  @IsString()
  @IsMongoId({ message: CommentValidateMessage.INVALID_ID })
  public userId: string;
}
