import { convertAllObjProps } from '../common/convert-obj';

/**
  * Convert string from camel to snake case.
  * */
export type CamelToSnakeCase<T extends string> = InnerCamelCaseToSnakeCase<T>;

type AllPropertiesCamelToSnakeCase<T extends Record<PropertyKey, unknown>> = {
  [K in keyof T as
  K extends string
    ? CamelToSnakeCase<K>
    : K
  ]: T[K];
};

/**
  * Convert a string from camel to snake case
  * Or, if passed an object will convert all property names from camel case to snake case
  * */
export function camelToSnakeCase<T extends string>(target: T): CamelToSnakeCase<T>;
export function camelToSnakeCase<T extends Record<PropertyKey, unknown>>(
  target: T,
): AllPropertiesCamelToSnakeCase<T>;
export function camelToSnakeCase<T extends string | Record<PropertyKey, unknown>>(
  target: T,
) {
  if (typeof target === 'string') {
    return strCamelToSnakeCase(target);
  }

  const targetRecord = target as Exclude<T, string>;
  return convertAllObjProps<
  typeof targetRecord,
  AllPropertiesCamelToSnakeCase<typeof targetRecord>
  >(
    targetRecord,
    (key) => strCamelToSnakeCase(key),
  );
}

export function strCamelToSnakeCase<T extends string>(target: T): CamelToSnakeCase<T> {
  let snakeCasedTarget = '';

  for (let idx = 0; idx < target.length; idx += 1) {
    const currentChar = target[idx]!;

    if (currentChar.toUpperCase() === currentChar) {
      // Current character is uppercase, so we lowercase it and prefix an _
      snakeCasedTarget += `_${currentChar.toLowerCase()}`;
    }
  }

  return snakeCasedTarget as CamelToSnakeCase<T>;
}

type InnerCamelCaseToSnakeCase<
  T extends string,
  LeadingString extends string = '',
> =
  // Is there another capital letter in T?
  T extends `${infer Head}${CapitalLetter}${infer _Tail}`
    // If so, get Tail which is the capital letter until end of string
    ? T extends `${Head}${infer Tail}`
      ? InnerCamelCaseToSnakeCase<
      // Remove the capital letter from tail
      Uncapitalize<Tail>,
            // Insert an _
            `${LeadingString}${Head}_`
      >
    // This should never happen
      : `${LeadingString}${T}`
    // Otherwise, since there's no capital letters left we're done parsing
    : `${LeadingString}${T}`;

type CapitalLetter =
  | 'A' | 'B' | 'C' | 'D' | 'E'
  | 'F' | 'G' | 'H' | 'I' | 'J'
  | 'K' | 'L' | 'M' | 'N' | 'O'
  | 'P' | 'Q' | 'R' | 'S' | 'T'
  | 'U' | 'V' | 'W' | 'X' | 'Y'
  | 'Z';
