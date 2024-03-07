/* eslint-disable @typescript-eslint/no-explicit-any */
export function convertAllObjProps<
  TRecord extends Record<PropertyKey, any>,
  TTransformedRecord extends Record<PropertyKey, any>,
>(
  targetRecord: TRecord,
  transformer: (key: string) => keyof TTransformedRecord,
): TTransformedRecord {
  return Object.keys(targetRecord)
    .reduce((newCasedTarget, _key) => {
      const key = _key as keyof TRecord;
      if (typeof key !== 'string') {
        newCasedTarget[
          key as keyof TRecord // somehow the type inference gets dropped here, so need to cast
        ] = targetRecord[key];
        return newCasedTarget;
      }

      const newCasedKey = transformer(key);
      newCasedTarget[newCasedKey] = targetRecord[key];

      return newCasedTarget;
    }, {} as TTransformedRecord);
}

export type ObjectKey = string | symbol;
