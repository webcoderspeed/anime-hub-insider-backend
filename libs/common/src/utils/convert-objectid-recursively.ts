import { Types } from 'mongoose';

/**
 * Recursively checks an object or array for valid ObjectId strings and converts them to ObjectId instances.
 * @param data - The input object or array to traverse.
 * @returns The updated object or array with ObjectId strings converted, maintaining the original structure.
 */
export function convertToObjectIdRecursively<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map((item) =>
      convertToObjectIdRecursively(item),
    ) as unknown as T;
  } else if (data !== null && typeof data === 'object') {
    const updatedObject = {} as Record<string, any>;
    for (const [key, value] of Object.entries(data)) {
      updatedObject[key] = convertToObjectIdRecursively(value);
    }
    return updatedObject as T;
  } else if (typeof data === 'string' && Types.ObjectId.isValid(data)) {
    return new Types.ObjectId(data) as unknown as T;
  }
  return data;
}
