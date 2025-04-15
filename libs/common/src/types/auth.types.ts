import { IUserRole } from './user.types';

export interface ITokenPayload {
  user: string;
  role: IUserRole;
}
