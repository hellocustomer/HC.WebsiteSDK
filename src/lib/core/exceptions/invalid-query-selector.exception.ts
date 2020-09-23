import { BaseException } from './base.exception';

/**
 * Exception raised when provided query selector is not targeting any existing DOM element
 *
 * @category Exceptions
 */
export class InvalidQuerySelectorException extends BaseException {}
