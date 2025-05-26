import { isObjectOrArray } from './is-object-or-array';
import { isObject } from './is-object';

export const isDeepEqual = (object1: unknown, object2: unknown): boolean => {
  if (Object.is(object1, object2)) {
    return true;
  }

  if (typeof object1 === 'function' && typeof object2 === 'function') {
    return true;
  }

  if (!isObjectOrArray(object1) || !isObjectOrArray(object2)) {
    return false;
  }

  if (object1.constructor !== object2.constructor) {
    return false;
  }

  if (Array.isArray(object1) && Array.isArray(object2)) {
    if (object1.length !== object2.length) {
      return false;
    }

    return object1.every((value, index) => isDeepEqual(value, object2[index]));
  }

  if (!isObject(object1) || !isObject(object2)) {
    return false;
  }

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== new Set([...keys1, ...keys2]).size) {
    return false;
  }

  for (const key of keys1) {
    if (!isDeepEqual(object1[key], object2[key])) {
      return false;
    }
  }

  return true;
};
