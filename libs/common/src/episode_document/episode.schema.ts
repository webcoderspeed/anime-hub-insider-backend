import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema()
export class Episode extends AbstractDocument {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  number: number;

  @Prop()
  airDate: string;

  @Prop()
  videoUrl: string;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
