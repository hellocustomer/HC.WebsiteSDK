import { BaseException } from './base.exception';

/**
 * Exception raised when provided configuration is invalid
 *
 * @category Exceptions
 */
export class InvalidConfigException extends BaseException {
  constructor(message: string, public errors: unknown) {
    super(message);
  }
}
