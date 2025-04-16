import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema()
export class Genre extends AbstractDocument {
  @Prop({ required: true, unique: true })
  name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
