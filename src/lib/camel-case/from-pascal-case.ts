import { convertAllObjProps } from '../common/convert-obj';

export type PascalToCamelCase<T extends string> = Uncapitalize<T>;

type AllPropertiesPascalToCamelCase<T extends Record<PropertyKey, unknown>> = {
  [K in keyof T as
  K extends string
    ? PascalToCamelCase<K>
    : K
  ]: T[K]
};

/**
  * Convert pascal case to camel case
  * Either pass a string or an object, if an object is passed, all property names will be converted
  *
  * @example
  * ```
  * const cameled = pascalToCamelCase('PascalCase'); // pascalCase
  *
  * const cameledStruct = pascalToCamelCase({ CreatedAt: new Date(), UpdatedAt: null });
  * cameledStruct; // { createdAt: Date, updatedAt: Date | null }
  * ```
  * */
export function pascalToCamelCase<T extends string>(target: T): PascalToCamelCase<T>;
export function pascalToCamelCase<T extends Record<PropertyKey, unknown>>(
  target: T,
): AllPropertiesPascalToCamelCase<T>;
export function pascalToCamelCase<T extends string | Record<PropertyKey, unknown>>(
  target: T,
) {
  if (typeof target === 'string') {
    return strPascalToCamelCase(target);
  }

  const targetRecord = target as Exclude<T, string>;

  return convertAllObjProps<
    typeof targetRecord,
  AllPropertiesPascalToCamelCase<typeof targetRecord>
  >(
    targetRecord,
    (key) => strPascalToCamelCase(key),
  );
}

function strPascalToCamelCase<T extends string>(target: T): PascalToCamelCase<T> {
  return (
    target.charAt(0).toLowerCase() + target.slice(1)
  ) as PascalToCamelCase<T>;
}
