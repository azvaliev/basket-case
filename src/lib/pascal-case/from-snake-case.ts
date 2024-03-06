import type { SnakeToCamelCase } from '../camel-case';
import { strSnakeToCamelCase } from '../camel-case/from-snake-case';
import { convertAllObjProps } from '../common/convert-obj';
import { strCamelToPascalCase } from './from-camel-case';

/**
  * Convert string from pascal to snake case.
  * Just like snake to camel case, but capitalizing first letter
  * @see `SnakeToCamelCase`
  * */
export type SnakeToPascalCase<T extends string> = Capitalize<SnakeToCamelCase<T>>;

type AllPropertiesSnakeToPascalCase<T extends Record<PropertyKey, unknown>> = {
  [K in keyof T as
  K extends string
    ? SnakeToCamelCase<K>
    : K
  ]: T[K]
};

/**
  * Convert a string from snake to pascal case
  * Or, if passed an object will convert all property names from snake case to pascal case
  *
  * @example
  * ```
  * const pascalCaseStr = snakeToPascalCase("foo_bar_bazz"); // FooBarBazz
  *
  * const pascalCaseProps = snakeToPascalCase({ created_at: new Date(), updated_at: null });
  * pascalCaseProps; // { CreatedAt: Date, UpdatedAt: Date | null }
  * ```
  * */
export function snakeToPascalCase<T extends string>(target: T): SnakeToPascalCase<T>;
export function snakeToPascalCase<T extends Record<PropertyKey, unknown>>(
  target: T
): AllPropertiesSnakeToPascalCase<T>;
export function snakeToPascalCase<T extends string | Record<PropertyKey, unknown>>(
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