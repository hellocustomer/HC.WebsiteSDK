/**
 * @ignore
 */
export function flattenObject<T>(
  inputObject: T
): Record<string, string | number | boolean> {
  if (!inputObject || typeof inputObject !== 'object') return {};
  return Object.entries(inputObject).reduce((result, current) => {
    const [key, value] = current;
    let partialResult: Record<string, string>;
    if (typeof value === 'object' && value != null)
      partialResult = Object.entries(flattenObject(value)).reduce(
        (total, current) => ({
          ...total,
          [key +
          (current[0].startsWith('[') ? '' : '.') +
          current[0]]: current[1],
        }),
        {}
      );
    else partialResult = { [key]: value };

    return {
      ...result,
      ...partialResult,
    };
  }, {});
}
