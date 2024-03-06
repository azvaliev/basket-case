import { convertAllObjProps } from '../common/convert-obj';

export type CamelToPascalCase<T extends string> = Capitalize<T>;

type AllPropertiesCamelToPascalCase<T extends Record<PropertyKey, unknown>> = {
  [K in keyof T as
  K extends string
    ? CamelToPascalCase<K>
    : K
  ]: T[K]
};

/**
  * Convert camel case to pascal case
  * Either pass a string or an object, if an object is passed, all property names will be converted
  *
  * @example
  * ```
  * const pascaled = camelToPascalCase('pascalCase'); // PascalCase
  *
  * const pascalStruct = camelToPascalCase({ createdAt: new Date(), updatedAt: null });
  * pascalStruct; // { CreatedAt: Date, UpdatedAt: Date | null }
  * ```
  * */
export function camelToPascalCase<T extends string>(target: T): CamelToPascalCase<T>;
export function camelToPascalCase<T extends Record<PropertyKey, unknown>>(
  target: T,
): AllPropertiesCamelToPascalCase<T>;
export function camelToPascalCase<T extends string | Record<PropertyKey, unknown>>(
  target: T,
) {
  if (typeof target === 'string') {
    return strCamelToPascalCase(target);
  }

  const targetRecord = target as Exclude<T, string>;
  return convertAllObjProps<
  typeof targetRecord,
  AllPropertiesCamelToPascalCase<typeof targetRecord>
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
