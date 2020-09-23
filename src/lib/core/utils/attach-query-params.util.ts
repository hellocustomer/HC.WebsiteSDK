/**
 * @ignore
 */
export function attachQueryParams(
  url: string,
  params: { [key: string]: string | number | boolean }
): string {
  return Object.entries(params).reduce((result, current, index, whole) => {
    if (index === 0) result += '?';
    result += current.join('=');
    if (index !== whole.length - 1) result += '&';
    return result;
  }, url);
}
