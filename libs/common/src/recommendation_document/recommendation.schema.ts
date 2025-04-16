import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({
  collection: 'users',
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Recommendation extends AbstractDocument {
  @Prop({ required: true })
  animeId: string;

  @Prop()
  reason: string;
}
export const RecommendationSchema =
  SchemaFactory.createForClass(Recommendation);
