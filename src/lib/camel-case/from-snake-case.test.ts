import { describe, expect, it } from 'vitest';
import type { Equals, Expect } from '../common/test-type-helpers';
import { snakeToCamelCase } from './from-snake-case';

describe.concurrent('Convert from snake case to camel case', () => {
  it('converts a string from snake case to camel case', () => {
    const recieved = snakeToCamelCase('snake_case_test');
    const expected = 'snakeCaseTest';

    type _RecievedCorrectType = Expect<Equals<
    typeof recieved,
    typeof expected
    >>;
    expect(recieved).toEqual(expected);
  });

  it('converts all properties in an object from snake case to camel case', () => {
    const created_at = new Date();
    const recieved = snakeToCamelCase({
      created_at,
      updated_at: null,
      camelCasedProp: null,
    });
    const expected = {
      createdAt: created_at,
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
