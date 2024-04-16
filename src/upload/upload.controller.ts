import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  BadRequestException,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  //------------------------------------------------------------------------------ upload video ----
  // @Post('/video')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const param = req.params.param;
          let folderPath = './uploads/videos';

          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true }); // recursive: true ensures that all nested folders are created
          }
          cb(null, folderPath);
        },

        filename: (req, file, cb) => {
          const randomName = generateUniqueFileName(file);
          return cb(null, randomName);
        },
      }),
      limits: { fileSize: 1024 * 1024 * 50 }, // 1 MB limit
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(mp4|avi|mkv|mov|flv|wmv|webm)$/i)) {
          // allow storing only jpeg, png, and gif
          cb(null, true);
        } else {
          cb(new BadRequestException(['Only video files are allowed!']), false);
        }
      },
    }),
  )

  //@CanDoThis('products:create')
  createVideo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1000 * 1000 * 50 })],
      }),
    )
    image: // @ts-ignore
    Express.Multer.File,
  ) {
    return {
      url: image['path'],
      full_url: `${process.env.APP_PATH_URL}/${image['path']}`,
    };
  }
  //------------------------------------------------------------------------------ upload svg ----
  // @Post('/svg')
  @UseInterceptors(
    FileInterceptor('svg', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const param = req.params.param;
          let folderPath = './uploads/svg';

          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true }); // recursive: true ensures that all nested folders are created
          }
          cb(null, folderPath);
        },

        filename: (req, file, cb) => {
          const randomName = generateUniqueFileName(file);
          return cb(null, randomName);
        },
      }),
      limits: { fileSize: 1024 * 1024 * 50 }, // 1 MB limit
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(svg|svg+xml|svg\+xml)$/i)) {
          // allow storing only jpeg, png, and gif
          cb(null, true);
        } else {
          cb(new BadRequestException(['Only SVG files are allowed!']), false);
        }
      },
    }),
  )

  //@CanDoThis('products:create')
  createSvg(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1000 * 1000 * 50 })],
      }),
    )
    image: // @ts-ignore
    Express.Multer.File,
  ) {
    return {
      url: image['path'],
      full_url: `${process.env.APP_PATH_URL}/${image['path']}`,
    };
  }
  //------------------------------------------------------------------------------ upload image ----
  @Post('')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: undefined,
      limits: { fileSize: 1024 * 1024 }, // 1 MB limit
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          // allow storing only jpeg, png, and gif
          cb(null, true);
        } else {
          cb(
            new BadRequestException(['Image Only image files are allowed!']),
            false,
          );
        }
      },
    }),
  )

  //@CanDoThis('products:create')
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1000 * 1000 })],
      }),
    )
    image: // @ts-ignore
    Express.Multer.File,
  ) {
    // Image processing using Sharp
    const processedImageBuffer = await sharp(image.buffer)
      .jpeg({ quality: 80 }) // Adjust the quality as needed
      .toBuffer();
    const destinationPath = 'uploads/images';
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }
    // Generate a unique file name
    const uniqueFileName = generateUniqueFileName(image);
    const filePathOneServer = `${destinationPath}/${uniqueFileName}`;

    // Save the processed image to the file system
    fs.writeFileSync(filePathOneServer, processedImageBuffer);

    return {
      url: filePathOneServer,
      full_url: `${process.env.APP_PATH_URL}/${filePathOneServer}`,
    };
    //return this.productsAdminService.createProductHelper(body, image);
  }

  /*
@Post(':param')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const param = req.params.param;
          let folderPath;

          switch (param) {
            case 'product-images':
              folderPath = './uploads/productImages/';
              break;
            case 'customer-images':
              folderPath = './uploads/customerImages/';
              break;
            case 'user-images':
              folderPath = './uploads/userImages/';
              break;
            // ... add more cases as needed
            default:
              folderPath = './uploads/default/';
          }
          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true }); // recursive: true ensures that all nested folders are created
          }
          cb(null, folderPath);
        },

        filename: (req, file, cb) => {
          const randomName = generateUniqueFileName(file);
          return cb(null, randomName);
        },
      }),
      limits: { fileSize: 1024 * 1024 }, // 1 MB limit
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          // allow storing only jpeg, png, and gif
          cb(null, true);
        } else {
          cb(
            new BadRequestException(['Image Only image files are allowed!']),
            false,
          );
        }
      },
    }),
  )

  //@CanDoThis('products:create')
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1000 * 1000 })],
      }),
    )
    image: Express.Multer.File,
  ) {
    return {
      url: image['path'],
      full_url: `${process.env.APP_PATH_URL}/${image['path']}`,
    };
    //return this.productsAdminService.createProductHelper(body, image);
  }

  */
}

const generateUniqueFileName = (file) => {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
  const randomString = Math.random().toString(36).substring(2, 8);
  const fileExtension = extname(file.originalname);

  return `${timestamp}_${randomString}${fileExtension}`;
};
