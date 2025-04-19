import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database';
import { Types } from 'mongoose';

@Schema({
  collection: 'episodes',
  versionKey: false,
  timestamps: true,
})
export class Episode extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: 'Anime', required: true })
  anime: Types.ObjectId;

  @Prop({ required: true })
  number: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  videoUrl: string;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
