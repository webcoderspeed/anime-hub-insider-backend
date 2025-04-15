import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { Auth, AuthSchema } from './auth.schema';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Auth.name,
        schema: AuthSchema,
      },
    ]),
  ],
  providers: [AuthRepository],
  exports: [AuthRepository],
})
export class AuthDocumentModule {}
