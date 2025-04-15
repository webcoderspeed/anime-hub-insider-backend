import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({
  collection: 'medias',
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Media extends AbstractDocument {
  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  url: string;

  @Prop({
    type: String,
  })
  type: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted?: boolean;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
