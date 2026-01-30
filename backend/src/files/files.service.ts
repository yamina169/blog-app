import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { UploadFileDto } from './dto/upload-file.dto';
import * as dotenv from 'dotenv';

dotenv.config();

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}`);
  }
  return value;
}

@Injectable()
export class FilesService {
  private s3 = new S3Client({
    region: getEnvVar('MINIO_REGION'),
    endpoint: getEnvVar('MINIO_ENDPOINT'),
    credentials: {
      accessKeyId: getEnvVar('MINIO_ACCESS_KEY'),
      secretAccessKey: getEnvVar('MINIO_SECRET_KEY'),
    },
    forcePathStyle: true, // required for MinIO
  });

  private bucket = process.env.MINIO_BUCKET || 'files';

  async uploadFile(file: Express.Multer.File, dto: UploadFileDto) {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      Metadata: {
        title: dto.title,
        uploadedBy: dto.uploadedBy,
      },
    });

    await this.s3.send(command);
    return {
      key: file.originalname,
      bucket: this.bucket,
      title: dto.title,
      uploadedBy: dto.uploadedBy,
    };
  }

  async getFileAndMetadata(key: string) {
    const headCommand = new HeadObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    const metaResponse = await this.s3.send(headCommand);

    const getCommand = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    const fileResponse = await this.s3.send(getCommand);

    return {
      metadata: metaResponse.Metadata,
      file: fileResponse.Body,
      contentType: fileResponse.ContentType,
    };
  }
}
