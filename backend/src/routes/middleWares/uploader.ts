import { Request } from 'express';
import AWS, { S3 } from 'aws-sdk';
import multer, { Instance } from 'multer';
import multerS3, { AUTO_CONTENT_TYPE } from 'multer-s3';
import path from 'path';

const s3: S3 = new AWS.S3({
    accessKeyId: 'AKIAUOO7GX7CPOUKU4ML',
    secretAccessKey: '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',
    region: 'ap-northeast-2'
});

export const profileImageUploader: Instance = multer({
    storage: multerS3({
        s3,
        bucket: 'mans-buy/profile',
        acl: 'public-read',
        contentType: AUTO_CONTENT_TYPE,
        metadata: (req: Request, file: Express.Multer.File, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req: Request, file: Express.Multer.File, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + '_trusty_' + new Date().valueOf() + ext);
        },
    })
});
export const productImageUploader: Instance = multer({
    storage: multerS3({
        s3,
        bucket: 'mans-buy/products',
        acl: 'public-read',
        contentType: AUTO_CONTENT_TYPE,
        metadata: (req: Request, file: Express.Multer.File, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req: Request, file: Express.Multer.File, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + '_trusty_' + new Date().valueOf() + ext);
        },
    })
});
