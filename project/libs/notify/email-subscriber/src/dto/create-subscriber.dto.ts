import { IsEmail, IsNotEmpty } from 'class-validator';

import {EmailSubscriberValidationMessage} from '../email-subscriber.constants';
import { Subscriber } from '@project/shared/domain-types';

export class CreateSubscriberDto implements Subscriber {
  @IsEmail({}, { message: EmailSubscriberValidationMessage.EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: EmailSubscriberValidationMessage.FIRST_NAME_IS_EMPTY })
  public firstName: string;

  @IsNotEmpty({ message: EmailSubscriberValidationMessage.USER_ID_IS_EMPTY })
  public lastName: string;
}
