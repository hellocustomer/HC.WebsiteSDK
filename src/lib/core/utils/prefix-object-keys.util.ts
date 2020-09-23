/**
 * @ignore
 */
export function prefixObjectKeys<T>(
  inputObject: T,
  prefix: string
): Record<string, T[keyof T]> {
  return Object.entries(inputObject).reduce(
    (total, current) => ({
      ...total,
      [prefix + current[0]]: current[1],
    }),
    {}
  );
}
