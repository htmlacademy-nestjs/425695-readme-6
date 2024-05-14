import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/shared/core';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { Subscriber } from '@project/shared/domain-types';

@Injectable()
export class EmailSubscriberFactory implements EntityFactory<EmailSubscriberEntity> {
  public create(entityPlainData: Subscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity(entityPlainData);
  }
}
