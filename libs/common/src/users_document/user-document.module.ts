import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { User, UserSchema } from './user.schema';
import { UsersRepository } from './user.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class UserDocumentModule {}
