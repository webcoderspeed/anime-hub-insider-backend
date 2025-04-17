export const USER_ROLES = {
  ADMIN: 1,
  USER: 2,
} as const;

export const USER_ROLES_LABELS = {
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.USER]: 'User',
} as const;

export const ALL_USERS_ROLES = Object.values(USER_ROLES);

export const USER_SELECTED_FIELDS = 'name email phone avatar';

export const USER_POPULATED_FIELDS = [
  {
    path: 'avatar',
    model: 'Media',
    select: 'name url type',
  },
];
