import { SetMetadata } from '@nestjs/common';
import { IUserRole } from '../types';

export const Role = (roles: IUserRole[]) => SetMetadata('roles', roles);
