import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Relation } from './relation.schema';

@Injectable()
export class RelationRepository extends AbstractRepository<Relation> {
  protected readonly logger = new Logger(RelationRepository.name);

  constructor(
    @InjectModel(Relation.name) RelationModel: Model<Relation>,
    @InjectConnection() connection: Connection,
  ) {
    super(RelationModel, connection);
  }
}
