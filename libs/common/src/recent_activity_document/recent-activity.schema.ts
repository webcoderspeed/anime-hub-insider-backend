import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database';
import { Types } from 'mongoose';

@Schema({
  collection: 'recent_activities',
  versionKey: false,
  timestamps: true,
})
export class RecentActivity extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  activityType: string;

  @Prop({ required: true })
  targetId: string;

  @Prop()
  details: string;
}

export const RecentActivitySchema =
  SchemaFactory.createForClass(RecentActivity);
