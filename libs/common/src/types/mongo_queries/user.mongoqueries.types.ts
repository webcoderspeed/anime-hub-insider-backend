import { User } from '@app/common/users_document';
import { SortOrder } from 'mongoose';

export interface IGetAllUsersQueryParams {
  skip?: number;
  limit?: number;
  name?: string;
  email?: string;
  phone?: string;
  referenceEmail?: string;
  sortBy?: keyof User;
  sortOrder?: SortOrder;
  isActive?: boolean;
  isDeleted?: boolean;
}
