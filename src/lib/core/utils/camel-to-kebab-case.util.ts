/**
 * @ignore
 */
export function camelToKebabCase(input: string | number): string {
  return String(input)
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase();
}
