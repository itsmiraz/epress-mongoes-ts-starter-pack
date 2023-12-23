import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import config from '../config';
import fs from 'fs';

cloudinary.config({
  cloud_name: config.cloudniary_cloud_name,
  api_key: config.cloudniary_api_key,
  api_secret: config.cloudniary_api_secret,
});

export const SendImagesToCloudniary = (
  imageName: string,
  imageSource: string,
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imageSource,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fs.unlink(imageSource, (err: any) => {
          if (err) {
            // console.log(err);
          } else {
            // console.log('File Deleted');
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
