import { describe, expect, it } from 'vitest';
import { pascalToCamelCase } from './from-pascal-case';
import { Equals, Expect } from '../common/test-type-helpers';

describe.concurrent('Convert from pascal case to camel case', () => {
  it('converts a string from pascal case to camel case', () => {
    const recieved = pascalToCamelCase('PascalCaseTest');
    const expected = 'pascalCaseTest';

    type _RecievedCorrectType = Expect<Equals<
    typeof recieved,
    typeof expected
    >>;
    expect(recieved).toEqual(expected);
  });

  it('converts all properties in an object from pascal case to camel case', () => {
    const CreatedAt = new Date();
    const recieved = pascalToCamelCase({
      CreatedAt,
      UpdatedAt: null,
      camelCasedProp: null,
    });
    const expected = {
      createdAt: CreatedAt,
      updatedAt: null,
      camelCasedProp: null,
    };


    type _RecivedCorrectType = Expect<Equals<
    typeof recieved,
    typeof expected
    >>;
    expect(recieved).toStrictEqual(expected);
  });
});
