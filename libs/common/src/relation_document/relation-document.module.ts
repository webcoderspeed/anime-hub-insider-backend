import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { Relation, RelationSchema } from './relation.schema';
import { RelationRepository } from './relation.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Relation.name,
        schema: RelationSchema,
      },
    ]),
  ],
  providers: [RelationRepository],
  exports: [RelationRepository],
})
export class RelationDocumentModule {}
