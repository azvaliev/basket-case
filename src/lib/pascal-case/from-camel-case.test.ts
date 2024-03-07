import { describe, expect, it } from 'vitest';
import type { Equals, Expect } from '../common/test-type-helpers';
import { camelToPascalCase } from './from-camel-case';

describe.concurrent('Convert from camel case to pascal case', () => {
  it('converts a string', () => {
    const recieved = camelToPascalCase('pascalCaseTest');
    const expected = 'PascalCaseTest';

    type _RecievedCorrectType = Expect<Equals<
    typeof recieved,
    typeof expected
    >>;
    // @ts-expect-error this should error because string is too broad
    type _RecievedStrictType = Expect<Equals<
    typeof recieved,
    string
    >>;
    expect(recieved).toEqual(expected);
  });

  it('converts all properties in an object', () => {
    const createdAt = new Date();
    const recieved = camelToPascalCase({
      createdAt,
      updatedAt: null,
      PascalCasedProp: null,
    });
    const expected = {
      CreatedAt: createdAt,
      UpdatedAt: null,
      PascalCasedProp: null,
    };

    type _RecivedCorrectType = Expect<Equals<
    typeof recieved,
    typeof expected
    >>;
    // @ts-expect-error this should error because string is too broad
    type _RecievedStrictType = Expect<Equals<
    keyof typeof recieved,
    string
    >>;
    expect(recieved).toStrictEqual(expected);
  });
});
