import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from '../database';

@Schema({
  collection: 'watchlist',
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Watchlist extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Anime', required: true })
  anime: Types.ObjectId;

  @Prop({ default: 0 })
  progress: number; // episode number
}
export const WatchlistSchema = SchemaFactory.createForClass(Watchlist);
