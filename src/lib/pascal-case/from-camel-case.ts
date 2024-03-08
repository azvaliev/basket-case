import { type ObjectKey, convertAllObjProps } from '../common/convert-obj';

export type CamelToPascalCase<T extends string> = Capitalize<T>;

export type CamelToPascalCaseProps<T extends Record<ObjectKey, unknown>> = {
  [K in keyof T as
  K extends string
    ? CamelToPascalCase<K>
    : K
  ]: T[K]
};

/**
  * Convert camel case to pascal case
  * Either pass a string or an object, if an object is passed, all property names will be converted
  * */
export function camelToPascalCase<T extends string>(target: T): CamelToPascalCase<T>;
export function camelToPascalCase<T extends Record<ObjectKey, unknown>>(
  target: T,
): CamelToPascalCaseProps<T>;
export function camelToPascalCase<T extends string | Record<ObjectKey, unknown>>(
  target: T,
) {
  if (typeof target === 'string') {
    return strCamelToPascalCase(target);
  }

  const targetRecord = target as Exclude<T, string>;
  return convertAllObjProps<
  typeof targetRecord,
  CamelToPascalCaseProps<typeof targetRecord>
  >(
    targetRecord,
    (key) => strCamelToPascalCase(key),
  );
}

export function strCamelToPascalCase<T extends string>(target: T): CamelToPascalCase<T> {
  return (
    target.charAt(0).toUpperCase() + target.slice(1)
  ) as CamelToPascalCase<T>;
}
