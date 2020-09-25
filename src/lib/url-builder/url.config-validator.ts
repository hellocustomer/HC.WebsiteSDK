import { BaseConfigValidator } from '../core/base-classes/base.config-validator';
import { SurveyConfig } from '../core/interfaces/survey-config.interface';
import { ConfigValidationFunctionType } from '../core/types/config-validation-function.type';

/**
 * Class validating common survey config
 *
 * @category Validators
 */
export class UrlConfigValidator extends BaseConfigValidator<SurveyConfig> {
  public constructor() {
    super();
  }

  /**
   * Here validation functions for common SurveyConfig can be provided
   */
  protected defineValidationFunctions(): ConfigValidationFunctionType<
    SurveyConfig
  >[] {
    return [
      (config) => {
        return config.baseUrl
          ? null
          : {
              baseUrlRequired: 'Base URL is required',
            };
      },
      (config) => {
        return (typeof config.baseUrl as unknown) == 'string'
          ? null
          : {
              baseUrlIsString: 'Base URL must be a string',
            };
      },
      (config) => {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
          config.baseUrl
        )
          ? null
          : {
              baseUrlIsUrlFormat:
                'Base URL must be in URL format with protocol',
            };
      },
      (config) => {
        return (typeof config.tenantId as unknown) === 'string'
          ? null
          : {
              tenantIdIsString: 'tenantId must be a string',
            };
      },
      (config) => {
        return (typeof config.touchPointId as unknown) === 'string'
          ? null
          : {
              touchPointIdIsString: 'touchPointId must be a string',
            };
      },
      (config) => {
        return !config.language ||
          (typeof config.language as unknown) === 'string'
          ? null
          : {
              languageIsString: 'Language must be a string',
            };
      },
      (config) => {
        return !config.extra || (typeof config.extra as unknown) === 'object'
          ? null
          : {
              extraConfigIsObject: 'Extra config must be an object',
            };
      },
      (config) => {
        if (config.extra && config.extra.isPreview)
          console.warn('[Hello Customer SDK] Preview mode!');
        return null;
      },
    ];
  }
}
