import { BaseConfigValidator } from '../../core/base-classes/base.config-validator';
import { ConfigValidationFunctionType } from '../../core/types/config-validation-function.type';

import { ModalSurveyConfig } from './modal-survey-config.interface';

/**
 * Class validating provided ModalSurveyConfig
 *
 * @category Validators
 */
export class ModalSurveyConfigValidator extends BaseConfigValidator<
  ModalSurveyConfig
> {
  public constructor() {
    super();
  }

  protected defineValidationFunctions(): ConfigValidationFunctionType<
    ModalSurveyConfig
  >[] {
    return [
      (config) =>
        config.ignoreDefaultStyles == undefined ||
        (typeof config.ignoreDefaultStyles as unknown) == 'boolean'
          ? null
          : {
              ignoreDefaultStylesIsBoolean:
                'ignoreDefaultStyles must be a boolean',
            },
      (config) =>
        config.translucentBackground == undefined ||
        (typeof config.translucentBackground as unknown) == 'boolean'
          ? null
          : {
              translucentBackgroundIsBoolean:
                'translucentBackground must be a boolean',
            },
      (config) =>
        config.closeOnBackgroundClick == undefined ||
        (typeof config.closeOnBackgroundClick as unknown) == 'boolean'
          ? null
          : {
              closeOnBackgroundClickIsBoolean:
                'closeOnBackgroundClick must be a boolean',
            },
      (config) =>
        config.closeOnEscape == undefined ||
        (typeof config.closeOnEscape as unknown) == 'boolean'
          ? null
          : {
              closeOnEscapeIsBoolean: 'closeOnEscape must be a boolean',
            },
      (config) =>
        config.closeButton == undefined ||
        (typeof config.closeButton as unknown) == 'boolean'
          ? null
          : {
              closeButtonIsBoolean: 'closeButton must be a boolean',
            },
      (config) =>
        config.showByDefault == undefined ||
        (typeof config.showByDefault as unknown) == 'boolean'
          ? null
          : {
              showByDefaultIsBoolean: 'showByDefault must be a boolean',
            },
      (config) =>
        config.classNames == undefined ||
        (typeof config.classNames as unknown) == 'object'
          ? null
          : {
              classNamesIsObject: 'classNames must be an object',
            },
      (config) =>
        config.classNames == undefined ||
        Object.entries(config.classNames).every(
          (el) => (typeof el[1] as unknown) == 'string'
        )
          ? null
          : {
              classNamesValuesStrings: 'classNames values must be strings',
            },
      (config) =>
        config.modalStyle == undefined ||
        (typeof config.modalStyle as unknown) == 'object'
          ? null
          : {
              modalStyleIsObject: 'modalStyle must be an object',
            },
      (config) =>
        config.modalStyle == undefined ||
        Object.entries(config.modalStyle).every(
          (el) => (typeof el[1] as unknown) == 'object'
        )
          ? null
          : {
              modalStyleValuesObjects: 'modalStyle values must be objects',
            },
      (config) =>
        config.modalContainerSelector == undefined ||
        (typeof config.modalContainerSelector as unknown) == 'string'
          ? null
          : {
              modalContainerSelectorIsString:
                'modalContainerSelector is string',
            },
    ];
  }
}
