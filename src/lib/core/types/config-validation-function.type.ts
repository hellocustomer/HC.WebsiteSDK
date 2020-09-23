/**
 * Represents validation functions for surveys configs
 * @typeParam T  validated config type
 */
export type ConfigValidationFunctionType<T> = {
  (config: T): Record<string, string> | null;
};
