import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  Query,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dtos/upload-file.dto';
import { Response } from 'express';
import { GetMediaFileDto } from './dtos/get-media-file.dto';
import * as fs from 'fs';

@Controller('v1/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDto,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    return this.mediaService.uploadFile(file, uploadFileDto);
  }

  @Get('file')
  async getMediaFile(@Query() query: GetMediaFileDto, @Res() res: Response) {
    const buffer = await this.mediaService.getMediaFile(query.relativePath);
    res.send(buffer);
  }

  @Get('stream')
  async streamMedia(@Query() query: GetMediaFileDto, @Res() res: Response) {
    const filePath = this.mediaService.getMediaFilePath(query.relativePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found');
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = res.req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': getContentType(filePath),
      });

      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': getContentType(filePath),
      });
      fs.createReadStream(filePath).pipe(res);
    }
  }

  @Get(':id')
  async getMedia(@Param('id') id: string) {
    return this.mediaService.getMediaById(id);
  }
}

function getContentType(filePath: string): string {
  if (filePath.endsWith('.m3u8')) return 'application/vnd.apple.mpegurl';
  if (filePath.endsWith('.ts')) return 'video/mp2t';
  if (filePath.endsWith('.mp4')) return 'video/mp4';
  return 'application/octet-stream';
}
