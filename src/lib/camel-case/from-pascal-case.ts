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
  * const cameledStruct = pascalToCamelCase({ created_at: new Date(), updated_at: null });
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

  return Object.keys(targetRecord)
    .reduce((camelCasedTarget, key) => {
      if (typeof key !== 'string') {
        camelCasedTarget[key] = targetRecord[key];
        return camelCasedTarget;
      }

      const camelCasedKey = strPascalToCamelCase(key);
      camelCasedTarget[camelCasedKey] = targetRecord[key];

      return camelCasedTarget;
    }, {} as Record<PropertyKey, unknown>);
}

function strPascalToCamelCase<T extends string>(target: T): PascalToCamelCase<T> {
  return (
    target.charAt(0).toUpperCase() + target.slice(1)
  ) as PascalToCamelCase<T>;
}
