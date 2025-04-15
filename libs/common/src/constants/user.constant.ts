export const USER_ROLES = {
  ADMIN: 1,
  USER: 2,
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
