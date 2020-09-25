/**
 * @ignore
 */
export function trueByDefault(value: boolean | undefined): boolean {
  return value == undefined || value;
}
