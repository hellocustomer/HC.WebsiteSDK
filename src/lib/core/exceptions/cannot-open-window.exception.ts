import { BaseException } from './base.exception';

/**
 * Exception raised when library cannot open a new tab/window
 *
 * @category Exceptions
 */
export class CannotOpenWindowException extends BaseException {
  constructor() {
    super('[Hello Customer SDK] Cannot open window - check Your browser!');
  }
}
