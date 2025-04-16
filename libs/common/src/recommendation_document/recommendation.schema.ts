import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema()
export class Recommendation extends AbstractDocument {
  @Prop({ required: true })
  animeId: string;

  @Prop()
  reason: string;
}
export const RecommendationSchema =
  SchemaFactory.createForClass(Recommendation);
