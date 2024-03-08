import { strPascalToCamelCase } from '../camel-case/from-pascal-case';
import { type ObjectKey, convertAllObjProps } from '../common/convert-obj';
import { type CamelToSnakeCase, strCamelToSnakeCase } from './from-camel-case';

/**
  * Convert string from pascal case to snake case
  * Works by converting pascal -> camel, then using `CamelToSnakeCase`
  * @see `CamelToSnakeCase`
  * */
export type PascalToSnakeCase<T extends string> = CamelToSnakeCase<Uncapitalize<T>>;

export type PascalToSnakeCaseProps<T extends Record<ObjectKey, unknown>> = {
  [K in keyof T as
  K extends string
    ? PascalToSnakeCase<K>
    : K
  ]: T[K]
};

/**
  * Convert a string from pascal to snake case
  * Or, if passed an object will convert all property names from pascal case to snake case
  * */
export function pascalToSnakeCase<T extends string>(target: T): PascalToSnakeCase<T>;
export function pascalToSnakeCase<T extends Record<ObjectKey, unknown>>(
  target: T,
): PascalToSnakeCaseProps<T>;
export function pascalToSnakeCase<T extends string | Record<ObjectKey, unknown>>(
  target: T,
) {
  if (typeof target === 'string') {
    return strPascalToSnakeCase(target);
  }

  const targetRecord = target as Exclude<T, string>;
  return convertAllObjProps<
  typeof targetRecord,
  PascalToSnakeCaseProps<typeof targetRecord>
  >(
    targetRecord,
    strPascalToSnakeCase,
  );
}

function strPascalToSnakeCase<T extends string>(target: T): PascalToSnakeCase<T> {
  return strCamelToSnakeCase(
    strPascalToCamelCase(target),
  );
}
