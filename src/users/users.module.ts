import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, MailerModule, UserDocumentModule } from '@app/common';

@Module({
  imports: [DatabaseModule, UserDocumentModule, MailerModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
