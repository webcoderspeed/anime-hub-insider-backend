import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database';
import { Types } from 'mongoose';

@Schema({
  collection: 'notifications',
  versionKey: false,
  timestamps: true,
})
export class Notification extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop()
  type: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
