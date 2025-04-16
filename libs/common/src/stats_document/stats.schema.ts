import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from '../database';

@Schema()
export class Stats extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ default: 0 })
  totalWatched: number;

  @Prop({ default: 0 })
  totalFavorites: number;

  @Prop({ default: 0 })
  totalReviews: number;
}
export const StatsSchema = SchemaFactory.createForClass(Stats);
