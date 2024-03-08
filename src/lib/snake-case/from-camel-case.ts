import { type ObjectKey, convertAllObjProps } from '../common/convert-obj';

/**
  * Convert string from camel to snake case.
  * */
export type CamelToSnakeCase<T extends string> = InnerCamelCaseToSnakeCase<T>;

export type CamelToSnakeCaseProps<T extends Record<ObjectKey, unknown>> = {
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
export function camelToSnakeCase<T extends Record<ObjectKey, unknown>>(
  target: T,
): CamelToSnakeCaseProps<T>;
export function camelToSnakeCase<T extends string | Record<ObjectKey, unknown>>(
  target: T,
) {
  if (typeof target === 'string') {
    return strCamelToSnakeCase(target);
  }

  const targetRecord = target as Exclude<T, string>;
  return convertAllObjProps<
  typeof targetRecord,
  CamelToSnakeCaseProps<typeof targetRecord>
  >(
    targetRecord,
    (key) => strCamelToSnakeCase(key),
  );
}

export function strCamelToSnakeCase<T extends string>(target: T): CamelToSnakeCase<T> {
  let snakeCasedTarget = '';

  for (let idx = 0; idx < target.length; idx += 1) {
    const currentChar = target[idx]!;

    const charIsUppercaseLetter = (currentChar.toUpperCase() === currentChar)
      // If the character is lowercased and still the same then it's a special character
      && (currentChar.toLowerCase() !== currentChar);
    if (charIsUppercaseLetter) {
      // Current character is uppercase, so we lowercase it and prefix an _
      snakeCasedTarget += `_${currentChar.toLowerCase()}`;
    } else {
      snakeCasedTarget += currentChar;
    }
  }

  return snakeCasedTarget as CamelToSnakeCase<T>;
}

// Disabling because this type needs comments lol
/* eslint-disable max-len */
type InnerCamelCaseToSnakeCase<
  T extends string,
  LeadingString extends string = '',
> =
  // Is there another capital letter in T?
  T extends `${infer Head}${CapitalLetter}${string}`
    // If so, get Tail which is the capital letter until end of string
    ? T extends `${
        Head extends Lowercase<Head> ? Head : never // tbh not entirely confident in how this works but it does
    }${infer Tail}`
      ? Head extends Lowercase<Head> // Head should not have any capitals we want tail to be next capital
        ? InnerCamelCaseToSnakeCase<
        // Remove the capital letter from tail
        Uncapitalize<Tail>,
            // Insert an _
            `${LeadingString}${Head}_`
        >
        : never
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
