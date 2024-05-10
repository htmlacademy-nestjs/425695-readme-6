import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/shared/core';
import { FileUploaderEntity } from './file-uploader.entity';
import { FileData } from '@project/shared/domain-types';

@Injectable()
export class FileUploaderFactory implements EntityFactory<FileUploaderEntity> {
  public create(entityPlainData: FileData): FileUploaderEntity {
    return new FileUploaderEntity(entityPlainData);
  }
}
