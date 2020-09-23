/**
 *  @ignore
 */
export function wrapObjectKeysInBrackets<T>(
  inputObj: T
): Record<string, T[keyof T]> {
  return Object.entries(inputObj).reduce(
    (total, current) => ({
      ...total,
      [current[0].startsWith('[') ? current[0] : `[${current[0]}]`]: current[1],
    }),
    {}
  );
}
