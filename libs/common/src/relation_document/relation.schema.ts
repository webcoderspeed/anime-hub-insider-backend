import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({
  collection: 'relation',
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Relation extends AbstractDocument {
  @Prop({ required: true })
  animeId: string;

  @Prop({ required: true })
  relationType: string; // e.g. "prequel", "sequel"
}
export const RelationSchema = SchemaFactory.createForClass(Relation);
