import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database';

@Schema({
  collection: 'users',
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Anime extends AbstractDocument {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop()
  description: string;

  @Prop()
  hasSub: boolean;

  @Prop()
  status: string;

  @Prop()
  type: string;

  @Prop()
  releaseDate: string;

  @Prop({ type: [String] })
  studios: string[];
}
export const AnimeSchema = SchemaFactory.createForClass(Anime);
