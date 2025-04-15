import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { Types } from 'mongoose';

@Schema({
  collection: 'auths',
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Auth extends AbstractDocument {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  user: Types.ObjectId;

  @Prop({
    type: String,
  })
  passwordHash: string;

  @Prop({
    type: String,
    default: null,
  })
  refreshToken?: string;

  @Prop({
    type: String,
    default: null,
  })
  passwordResetToken?: string;

  @Prop({
    type: Date,
    default: null,
  })
  passwordResetExpires?: Date;

  @Prop({
    type: Number,
    default: 0,
  })
  failedLoginAttempts?: number;

  @Prop({
    type: Date,
    default: null,
  })
  attemptBlockTime?: Date;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted?: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
