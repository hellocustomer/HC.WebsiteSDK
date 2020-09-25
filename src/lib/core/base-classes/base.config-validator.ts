import { InvalidConfigException } from '../exceptions/invalid-config.exception';
import { ConfigValidationFunctionType } from '../types/config-validation-function.type';

/**
 * Base class for all config validators,
 * contains common logic and defines interface for them
 * @typeParam T  validated configuration object type
 * @category Validators
 */
export abstract class BaseConfigValidator<T> {
  private validationFunctions: ConfigValidationFunctionType<T>[];

  protected constructor() {
    this.validationFunctions = this.defineValidationFunctions();
  }

  /**
   * Validate given configuration object and throw error if any error is encountered
   * @throws [[InvalidConfigException]]
   * @param config  config to validate
   */
  public validateAndThrowOnErrors(config: T): void {
    const errors = this.validate(config);
    if (Object.keys(errors).length > 0) {
      const errorMessage = `[Hello Customer SDK] Invalid config`;
      throw new InvalidConfigException(errorMessage, errors);
    }
  }

  public validate(config: T): Record<string, string> {
    return this.validationFunctions.reduce(
      (total, current) => ({
        ...total,
        ...current(config),
      }),
      {}
    );
  }

  protected abstract defineValidationFunctions(): ConfigValidationFunctionType<
    T
  >[];
}
