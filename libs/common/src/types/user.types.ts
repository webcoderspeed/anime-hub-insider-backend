import { USER_ROLES } from '../constants';

export type IUserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
