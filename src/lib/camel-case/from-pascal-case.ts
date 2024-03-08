import { type ObjectKey, convertAllObjProps } from '../common/convert-obj';

/**
  * Literally just lowercase the first letter to convert from pascal to camel case
  * */
export type PascalToCamelCase<T extends string> = Uncapitalize<T>;

export type PascalToCamelCaseProps<T extends Record<ObjectKey, unknown>> = {
  [K in keyof T as
  K extends string
    ? PascalToCamelCase<K>
    : K
  ]: T[K]
};

/**
  * Convert pascal case to camel case
  * Either pass a string or an object, if an object is passed, all property names will be converted
  * */
export function pascalToCamelCase<T extends string>(target: T): PascalToCamelCase<T>;
export function pascalToCamelCase<T extends Record<ObjectKey, unknown>>(
  target: T,
): PascalToCamelCaseProps<T>;
export function pascalToCamelCase<T extends string | Record<ObjectKey, unknown>>(
  target: T,
) {
  if (typeof target === 'string') {
    return strPascalToCamelCase(target);
  }

  const targetRecord = target as Exclude<T, string>;

  return convertAllObjProps<
    typeof targetRecord,
  PascalToCamelCaseProps<typeof targetRecord>
  >(
    targetRecord,
    (key) => strPascalToCamelCase(key),
  );
}

export function strPascalToCamelCase<T extends string>(target: T): PascalToCamelCase<T> {
  return (
    target.charAt(0).toLowerCase() + target.slice(1)
  ) as PascalToCamelCase<T>;
}
