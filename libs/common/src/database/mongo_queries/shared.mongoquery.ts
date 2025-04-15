import { PipelineStage, SortOrder, Types } from 'mongoose';

const { ObjectId } = Types;

/**
 * Parameters for pagination query.
 */
interface PaginationParams {
  limit: number;
  skip: number;
}

/**
 * Parameters for sorting query.
 */
interface SortingParams<T> {
  field: keyof T | ''; // Field must be a valid key of the target type or an empty string
  order: SortOrder;
}

/**
 * Get a MongoDB aggregation pagination query based on the provided limit and skip parameters.
 *
 * @param {PaginationParams} params - The parameters for pagination.
 * @returns {PipelineStage[]} - An array containing the MongoDB aggregation pagination query.
 */
export const getPaginationQuery = ({
  limit,
  skip,
}: PaginationParams): PipelineStage[] => {
  if (Number(limit) < 0 || Number(skip) < 0) {
    console.error('Invalid pagination parameters:', { limit, skip });
    return [];
  }

  return [
    {
      $skip: Number(skip),
    },
    {
      $limit: Number(limit),
    },
  ];
};

/**
 * Get MongoDB aggregation pipeline sorting query based on field and order.
 *
 * @template T - The type of the target object for which sorting is applied.
 * @param {SortingParams<T>} options - Sorting options.
 * @returns {PipelineStage[]} - MongoDB aggregation pipeline sorting query.
 */
export const getSortingQuery = <T>({
  field,
  order,
}: SortingParams<T>): PipelineStage[] => {
  if (field === '' || !order || (order !== 'asc' && order !== 'desc')) {
    console.error('Invalid sorting parameters:', { field, order });
    return [];
  }

  return [
    {
      $sort: {
        [field as string]: order === 'asc' ? 1 : -1,
      },
    },
  ];
};

/**
 * Generates a MongoDB aggregation query for converting a value field based on currency information.
 *
 * @template TFields - An object representing the field names for the query.
 * @param {Object} options - Configuration for the query.
 * @param {string} options.userCurrencyId - The user's currency ID.
 * @param {keyof TFields} options.localCurrencyField - The entity's local currency field (default: 'currency').
 * @param {keyof TFields} options.valueField - The field containing the value to be converted.
 * @returns {Array<Object>} MongoDB aggregation query steps.
 */
export function generatePriceConversionQuery<
  TFields extends Record<string, any>,
>({
  userCurrencyId,
  valueField,
  localCurrencyField = 'currency' as keyof TFields,
}: {
  userCurrencyId: string;
  valueField: keyof TFields;
  localCurrencyField?: keyof TFields;
}): PipelineStage[] {
  if (!userCurrencyId || !valueField) {
    console.error('userCurrencyId and valueField are required.', {
      userCurrencyId,
      valueField,
    });
    return [];
  }

  return [
    { $addFields: { userCurrencyId: new ObjectId(userCurrencyId) } },
    {
      $lookup: {
        from: 'currencies',
        localField: 'userCurrencyId',
        foreignField: '_id',
        as: 'userCurrency',
      },
    },
    { $unwind: { path: '$userCurrency', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'currencies',
        localField: localCurrencyField as string,
        foreignField: '_id',
        as: 'currency',
      },
    },
    { $unwind: { path: '$currency', preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        [valueField as string]: {
          $round: [
            {
              $cond: {
                if: { $eq: ['$currency._id', '$userCurrency._id'] },
                then: `$${String(valueField)}`,
                else: {
                  $divide: [
                    {
                      $multiply: [`$${String(valueField)}`, '$currency.value'],
                    },
                    { $ifNull: ['$userCurrency.value', 1] },
                  ],
                },
              },
            },
            2,
          ],
        },
      },
    },
    { $addFields: { currency: '$userCurrency' } },
    {
      $project: {
        userCurrencyId: 0,
        userCurrency: 0,
        'currency.isActive': 0,
        'currency.isDeleted': 0,
        'currency.createdAt': 0,
        'currency.updatedAt': 0,
      },
    },
  ];
}
