import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database';
import { Types } from 'mongoose';

@Schema({
  collection: 'favorites',
  versionKey: false,
  timestamps: true,
})
export class Favorite extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Anime', required: true })
  anime: Types.ObjectId;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
