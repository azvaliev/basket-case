/**
  * Convert T from snake_case to camelCase
  * */
export type SnakeToCamelCase<T extends string> = InnerSnakeToCamelCase<T>;
/**
  * Convert all properties of T from snake_case to camelCase
* */
type AllPropertiesSnakeToCamelCase<T extends Record<PropertyKey, unknown>> = {
  [K in keyof T as
  K extends string
    ? SnakeToCamelCase<K>
    : K
  ]: T[K];
};

/**
  * Convert a string from snake to camel case
  * Or, if passed an object will convert all property names from snake case to camel case
  *
  * @example
  * ```
  * const camelCaseStr = snakeToCamelCase("foo_bar_bazz"); // fooBarBazz
  *
  * const camelCaseProps = snakeToCamelCase({ created_at: new Date(), updated_at: null });
  * camelCaseProps; // { createdAt: Date, updatedAt: Date | null }
  * ```
  * */
export function snakeToCamelCase<T extends string>(target: T): SnakeToCamelCase<T>;
export function snakeToCamelCase<T extends Record<PropertyKey, unknown>>(
  target: T
): AllPropertiesSnakeToCamelCase<T>;
export function snakeToCamelCase<T extends string | Record<PropertyKey, unknown>>(
  target: T,
) {
  if (typeof target === 'string') {
    return strSnakeToCamelCase(target);
  }

  // TypeScript sucks at narrowing here, but since we checked for string and already returned if so
  // It's safe to assume it's an object
  type TRecord = Exclude<T, string>;
  const snakeCasedRecord = target as TRecord;

  return Object.keys(snakeCasedRecord)
    .reduce((camelCasedRecord, key) => {
      if (typeof key !== 'string') {
        camelCasedRecord[key] = snakeCasedRecord[key];
        return camelCasedRecord;
      }

      const camelCasedKey = strSnakeToCamelCase(key);
      camelCasedRecord[camelCasedKey] = snakeCasedRecord[key];

      return camelCasedRecord;
    }, {} as Record<PropertyKey, unknown>);
}

export function strSnakeToCamelCase<T extends string>(target: T): SnakeToCamelCase<T> {
  let camelCasedTarget = '';
  let idx = 0;

  for (;idx < target.length; idx += 1) {
    const currentChar = target[idx]!;

    switch (currentChar) {
      case '_': {
        // Skip _ for camel case
        idx += 1;

        // Uppercase next char after _
        camelCasedTarget += target[idx]?.toUpperCase() || '';

        break;
      }
      default: {
        camelCasedTarget += currentChar;
      }
    }
  }

  return camelCasedTarget as SnakeToCamelCase<T>;
}

type InnerSnakeToCamelCase<
  T extends string,
  LeadingString extends string = '',
> =
  // Is there an _ in T?
  T extends `${infer Head}_${infer Tail}`
    ? InnerSnakeToCamelCase<
    // If so, uppercase the letter after the _
    Capitalize<Tail>,
      // Here we exclude the _
      `${LeadingString}${Head}`
    >
    // Otherwise, since there's no _ left we're doing parsing
    : `${LeadingString}${T}`;
