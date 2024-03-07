import type { SnakeToCamelCase } from '../camel-case';
import { strSnakeToCamelCase } from '../camel-case/from-snake-case';
import { type ObjectKey, convertAllObjProps } from '../common/convert-obj';
import { strCamelToPascalCase } from './from-camel-case';

/**
  * Convert string from pascal to snake case.
  * Just like snake to camel case, but capitalizing first letter
  * @see `SnakeToCamelCase`
  * */
export type SnakeToPascalCase<T extends string> = Capitalize<SnakeToCamelCase<T>>;

type AllPropertiesSnakeToPascalCase<T extends Record<ObjectKey, unknown>> = {
  [K in keyof T as
  K extends string
    ? SnakeToPascalCase<K>
    : K
  ]: T[K]
};

/**
  * Convert a string from snake to pascal case
  * Or, if passed an object will convert all property names from snake case to pascal case
  * */
export function snakeToPascalCase<T extends string>(target: T): SnakeToPascalCase<T>;
export function snakeToPascalCase<T extends Record<ObjectKey, unknown>>(
  target: T
): AllPropertiesSnakeToPascalCase<T>;
export function snakeToPascalCase<T extends string | Record<ObjectKey, unknown>>(
  target: T,
) {
  if (typeof target === 'string') {
    return strSnakeToPascalCase(target);
  }

  // TypeScript sucks at narrowing here, but since we checked for string and already returned if so
  // It's safe to assume it's an object
  type TRecord = Exclude<T, string>;
  const snakeCasedRecord = target as TRecord;

  return convertAllObjProps<
  TRecord,
  AllPropertiesSnakeToPascalCase<TRecord>
  >(
    snakeCasedRecord,
    (key) => strSnakeToPascalCase(key),
  );
}

export function strSnakeToPascalCase<T extends string>(target: T): SnakeToPascalCase<T> {
  return strCamelToPascalCase(
    strSnakeToCamelCase(target),
  );
}
