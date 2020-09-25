import { BaseConfigValidator } from '../../core/base-classes/base.config-validator';
import { ConfigValidationFunctionType } from '../../core/types/config-validation-function.type';

import { InlineSurveyConfig } from './inline-survey-config.interface';

/**
 * Class validating provided InlineSurveyConfig
 *
 * @category Validators
 */
export class InlineSurveyConfigValidator extends BaseConfigValidator<
  InlineSurveyConfig
> {
  public constructor() {
    super();
  }

  /**
   * Here validation functions for InlineSurveyConfig can be provided
   */
  protected defineValidationFunctions(): ConfigValidationFunctionType<
    InlineSurveyConfig
  >[] {
    return [
      (config) =>
        config.elementSelector
          ? null
          : {
              elementSelectorRequired: 'Element selector is required',
            },
      (config) =>
        (typeof config.elementSelector as unknown) == 'string'
          ? null
          : {
              elementSelectorIsString: 'Element selector must be a string',
            },
      (config) =>
        !config.iFrameCssClasses ||
        (config.iFrameCssClasses as unknown) instanceof Array
          ? null
          : {
              cssClassesAreList: 'CssClasses must be a list',
            },
      (config) =>
        !config.iFrameCssClasses ||
        config.iFrameCssClasses.every(
          (cl) => (typeof cl as unknown) === 'string'
        )
          ? null
          : {
              cssClassesItemsAreString: 'CssClasses items must be strings',
            },
      (config) =>
        !config.iFrameInlineStylesRules ||
        (typeof config.iFrameInlineStylesRules as unknown) === 'object'
          ? null
          : {
              inlineStyleRulesAreObject: 'inlineStyleRules must be an object',
            },
    ];
  }
}
