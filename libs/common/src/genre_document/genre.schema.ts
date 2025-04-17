import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({
  collection: 'genre',
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Genre extends AbstractDocument {
  @Prop({ required: true, unique: true })
  name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
