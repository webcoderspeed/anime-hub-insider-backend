import { getPaginationQuery, getSortingQuery } from '@app/common/database';
import { IGetAllUsersQueryParams } from '@app/common/types';
import { PipelineStage } from 'mongoose';
import { User } from '../user.schema';

export const getAllUsersQuery = ({
  skip = 0,
  limit = 10,
  name = '',
  email = '',
  phone = '',
  referenceEmail = '',
  sortBy = 'createdAt',
  sortOrder = 'descending',
  isActive = true,
  isDeleted = false,
}: IGetAllUsersQueryParams) => {
  const baseQuery = {
    $and: [
      {
        $or: [
          { name: { $regex: name, $options: 'i' } },
          { email: { $regex: email, $options: 'i' } },
          { phone: { $regex: phone, $options: 'i' } },
          { referenceEmail: { $regex: referenceEmail, $options: 'i' } },
        ],
      },
      { isActive },
      { isDeleted },
    ],
  };

  const populateQuery = [
    {
      $lookup: {
        from: 'languages',
        localField: 'language',
        foreignField: '_id',
        as: 'language',
      },
    },
    {
      $unwind: {
        path: '$language',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'currencies',
        localField: 'currency',
        foreignField: '_id',
        as: 'currency',
      },
    },
    {
      $unwind: {
        path: '$currency',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'medias',
        let: { avatarId: '$avatar' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$_id', '$$avatarId'],
              },
            },
          },
          {
            $project: {
              _id: 0,
              url: 1,
              name: 1,
              type: 1,
            },
          },
        ],
        as: 'avatar',
      },
    },
    {
      $unwind: {
        path: '$avatar',
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  const userQuery: PipelineStage[] = [
    { $match: baseQuery },
    ...populateQuery,
    ...getSortingQuery<User>({
      field: sortBy,
      order: sortOrder,
    }),
    ...getPaginationQuery({ limit, skip }),
  ];

  const countQuery = [{ $match: baseQuery }, { $count: 'count' }];

  console.log(JSON.stringify({ query: userQuery }, null, 2));

  return { query: userQuery, countQuery };
};
