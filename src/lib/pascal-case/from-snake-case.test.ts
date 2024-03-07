import { describe, expect, it } from 'vitest';
import type { Equals, Expect } from '../common/test-type-helpers';
import { snakeToPascalCase } from './from-snake-case';

describe.concurrent('Convert from snake case to pascal case', () => {
  it('converts a string', () => {
    const recieved = snakeToPascalCase('snake_case_test');
    const expected = 'SnakeCaseTest';

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
    const created_at = Date();
    const recieved = snakeToPascalCase({
      created_at,
      updated_at: null,
      PascalCasedProp: null,
    });
    const expected = {
      CreatedAt: created_at,
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
