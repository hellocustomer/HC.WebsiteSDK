/**
 * @ignore
 */
export function patchObject<T>(source: T, patch: Partial<T>): T {
  return Object.entries(patch).reduce((result, current) => {
    const [key, value] = current;
    let partialResult;
    if (typeof value === 'object' && value != null)
      partialResult = patchObject(source[key as keyof T], value);
    else partialResult = value;

    return {
      ...result,
      [key]: partialResult,
    };
  }, source);
}
