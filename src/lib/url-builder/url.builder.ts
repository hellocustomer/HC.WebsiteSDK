import { UrlFactory } from '../core/factories/url.factory';
import { SurveyConfig } from '../core/interfaces/survey-config.interface';
import { wrapObjectKeysInBrackets } from '../core/utils/wrap-object-keys-in-brackets.util';

import { UrlConfigValidator } from './url.config-validator';

/**
 * Class is responsible for building and validating common survey configuration
 *
 * ### Example (es module)
 * ```js
 * import { UrlBuilder } from '@hello-customer/website-touchpoint'
 * const urlBuilder = new UrlBuilder({
 *   baseUrl: 'https://base.com',
 *   tenantId: 'xxxx',
 *   touchPointId: 'zzz',
 *   language: 'EN',
 *   extra: {
 *     isPreview: true
 *   }
 * });
 * ```
 *
 * ### Example (script tag)
 * ```html
 * <script src="https://unpkg.com/@hello-customer/website-touchpoint"></script>
 * <script>
 * const urlBuilder = new hcWebsiteTouchpoint.UrlBuilder({
 *     baseUrl: 'https://base.com',
 *     tenantId: 'xxxx',
 *     touchPointId: 'zzz',
 *     language: 'EN',
 *     extra: {
 *       isPreview: true
 *     }
 *    });
 * </script>
 * ```
 *
 * @category Root
 */
export class UrlBuilder {
  private readonly urlFactory: UrlFactory;
  private readonly validator: UrlConfigValidator;

  constructor(config: SurveyConfig) {
    config = UrlBuilder.transformConfig(config);
    this.validator = new UrlConfigValidator();
    this.validator.validateAndThrowOnErrors(config);
    this.urlFactory = new UrlFactory(config);
  }

  /**
   * @return UrlFactory object with injected validated config
   */
  public getUrlFactory(): UrlFactory {
    return this.urlFactory;
  }

  /**
   * If a provided configuration object has to be transformed before usage,
   * here such operations can be defined
   *
   * @param config
   * @private
   */
  private static transformConfig(config: SurveyConfig): SurveyConfig {
    // Handle metadata
    if (config.extra && config.extra.metadata) {
      config.extra.metadata = wrapObjectKeysInBrackets(config.extra.metadata);
    }

    return config;
  }
}
