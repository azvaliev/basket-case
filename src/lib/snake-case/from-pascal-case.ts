import { strPascalToCamelCase } from '../camel-case/from-pascal-case';
import { convertAllObjProps } from '../common/convert-obj';
import { type CamelToSnakeCase, strCamelToSnakeCase } from './from-camel-case';

/**
  * Convert string from pascal case to snake case
  * Works by converting pascal -> camel, then using `CamelToSnakeCase`
  * @see `CamelToSnakeCase`
  * */
export type PascalToSnakeCase<T extends string> = CamelToSnakeCase<Uncapitalize<T>>;

type AllPropertiesPascalToSnakeCase<T extends Record<PropertyKey, unknown>> = {
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
export function pascalToSnakeCase<T extends Record<PropertyKey, unknown>>(
  target: T,
): AllPropertiesPascalToSnakeCase<T>;
export function pascalToSnakeCase<T extends string | Record<PropertyKey, unknown>>(
  target: T,
) {
  if (typeof target === 'string') {
    return strPascalToSnakeCase(target);
  }

  const targetRecord = target as Exclude<T, string>;
  return convertAllObjProps<
  typeof targetRecord,
  AllPropertiesPascalToSnakeCase<typeof targetRecord>
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
