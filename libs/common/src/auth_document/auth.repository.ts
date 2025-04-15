import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Auth } from './auth.schema';

@Injectable()
export class AuthRepository extends AbstractRepository<Auth> {
  protected readonly logger = new Logger(AuthRepository.name);

  constructor(
    @InjectModel(Auth.name) authModel: Model<Auth>,
    @InjectConnection() connection: Connection,
  ) {
    super(authModel, connection);
  }
}
