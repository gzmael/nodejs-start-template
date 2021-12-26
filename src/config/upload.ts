import { randomBytes } from 'crypto';
import { config } from 'dotenv';
import { Request } from 'express';
import { diskStorage, FileFilterCallback, Options } from 'multer';
import path, { resolve } from 'path';
import { InvalidImageFormatError } from '@shared/errors/InvalidImageFormat';

config();
interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadFolder: string;
  avatarsFolder: string;

  upload(folder: string, isImage?: boolean, maxSize?: number): Options;

  config: {
    disk: Record<string, unknown>;
    aws: {
      bucket: string;
    };
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');
const avatarsFolder = path.resolve(
  __dirname,
  '..',
  '..',
  'tmp',
  'uploads',
  'avatars',
);

const uploadConfig = {
  driver: process.env.STORAGE_DRIVER || 'disk',

  tmpFolder,
  uploadFolder,
  avatarsFolder,

  upload(folder: string, isImage?: boolean, maxSize?: number) {
    return {
      limits: {
        fileSize: maxSize || 3145728,
      },
      fileFilter: (
        _: Request,
        file: Express.Multer.File,
        cb: FileFilterCallback,
      ): void => {
        if (isImage) {
          const regex = /image\/w*/;
          if (!regex.test(file.mimetype)) {
            cb(new InvalidImageFormatError());
          }
        }

        cb(null, true);
      },
      storage: diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', folder),
        filename: (_, file, cb) => {
          const hash = randomBytes(10).toString('hex');
          const name = `${hash}-${file.originalname}`;

          return cb(null, name);
        },
      }),
    };
  },

  config: {
    disk: {},
    aws: {
      bucket: process.env.AWS_BUCKET || 'bucketname',
    },
  },
} as IUploadConfig;

export default uploadConfig;
