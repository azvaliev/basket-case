import { describe, expect, it } from 'vitest';
import type { Equals, Expect } from '../common/test-type-helpers';
import { camelToSnakeCase } from './from-camel-case';

describe.concurrent('Convert from camel case to snake case', () => {
  it('converts a string', () => {
    const recieved = camelToSnakeCase('snakeCaseTest');
    const expected = 'snake_case_test';

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
    const recieved = camelToSnakeCase({
      createdAt,
      updatedAt: null,
      snake_cased_prop: null,
    });
    const expected = {
      created_at: createdAt,
      updated_at: null,
      snake_cased_prop: null,
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
