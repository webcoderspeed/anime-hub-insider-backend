import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database';
import { Types } from 'mongoose';

@Schema({
  collection: 'anime',
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
  @Prop({ required: true })
  title: string;

  @Prop({
    unique: true,
  })
  slug: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Genre' }],
    ref: 'Genre',
  })
  genres?: Types.ObjectId[];

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop()
  description: string;

  @Prop()
  hasSub: boolean;

  @Prop()
  status: 'completed' | 'ongoing';

  @Prop()
  type: 'tv' | 'movie' | 'ova' | 'ona' | 'special' | 'music';

  @Prop()
  releaseDate: string;

  @Prop({ type: [String] })
  studios: string[];
}
export const AnimeSchema = SchemaFactory.createForClass(Anime);
