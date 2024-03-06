export type PascalToCamelCase<T extends string> = Uncapitalize<T>;

export function pascalToCamelCase<T extends string>(target: T): PascalToCamelCase<T> {
  return (
    target.charAt(0).toUpperCase() + target.slice(1)
  ) as PascalToCamelCase<T>;
}
