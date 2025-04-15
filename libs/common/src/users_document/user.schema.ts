import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument, IUserRole } from '@app/common';
import { Types } from 'mongoose';
import { ALL_USERS_ROLES, USER_ROLES } from '../constants';

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
export class User extends AbstractDocument {
  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
    lowercase: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: Number,
    enum: ALL_USERS_ROLES,
    default: USER_ROLES.USER,
  })
  role?: IUserRole;

  @Prop({
    type: Types.ObjectId,
    ref: 'Media',
    default: null,
  })
  avatar?: Types.ObjectId;

  @Prop({
    type: String,
    default: null,
  })
  bio?: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive?: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
