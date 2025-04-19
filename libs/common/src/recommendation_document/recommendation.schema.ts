import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database';
import { Types } from 'mongoose';

@Schema({
  collection: 'recommendations',
  versionKey: false,
  timestamps: true,
})
export class Recommendation extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Anime', required: true })
  anime: Types.ObjectId;

  @Prop()
  reason?: string;
}

export const RecommendationSchema =
  SchemaFactory.createForClass(Recommendation);
