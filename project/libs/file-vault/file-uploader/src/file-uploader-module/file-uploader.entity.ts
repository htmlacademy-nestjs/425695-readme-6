import { Entity, StorableEntity } from '@project/shared/core';
import { FileData } from '@project/shared/domain-types';

export class FileUploaderEntity extends Entity implements StorableEntity<FileData> {
  public originalName: string;
  public size: number;
  public mimetype: string;
  public hashName: string;
  public path: string;
  public createdAt: Date;
  public updatedAt: Date;
  public subDirectory: string;

  constructor (file?: FileData) {
    super();
    this.populate(file);
  }

  public populate(file?: FileData): void {
    if (! file) {
      return;
    }

    this.id = file.id ?? '';
    this.originalName = file.originalName;
    this.size = file.size;
    this.mimetype = file.mimetype;
    this.hashName = file.hashName;
    this.path = file.path;
    this.createdAt = file.createdAt;
    this.updatedAt = file.updatedAt;
    this.subDirectory = file.subDirectory;
  }

  public toPOJO(): FileData {
    return {
      id: this.id,
      originalName: this.originalName,
      size: this.size,
      mimetype: this.mimetype,
      hashName: this.hashName,
      path: this.path,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      subDirectory: this.subDirectory,
    }
  }
}
