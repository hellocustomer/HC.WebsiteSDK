import { InvalidQuerySelectorException } from '../../core/exceptions/invalid-query-selector.exception';
import { UrlFactory } from '../../core/factories/url.factory';
import { UrlBuilder } from '../../url-builder/url.builder';

import { InlineSurveyConfig } from './inline-survey-config.interface';
import { InlineSurveyConfigValidator } from './inline-survey.config-validator';

/**
 * Class creates iframe element in container referenced by query selector,
 * it parses and validate provided configuration object
 *
 * ### Example (es module)
 * ```js
 * import { UrlBuilder, InlineSurvey } from '@hello-customer/website-touchpoint'
 * const urlBuilder = new UrlBuilder({
 *   baseUrl: 'https://base.com',
 *   language: 'EN',
 *   tenantId: 'xxxx',
 *   touchPointId: 'zzz',
 *   extra: {
 *     isPreview: true
 *   }
 * });
 * const inlineSurvey = new InlineSurvey(urlBuilder, {
 *   elementSelector: '#survey'
 * });
 * ```
 * ### Example (script tag)
 * ```html
 * <script src="https://......./website-touchpoint.js"></script>
 * <script>
 * const urlBuilder = new hcWebsiteSdk.UrlBuilder({
 *     baseUrl: 'https://base.com',
 *     tenantId: 'xxxx',
 *     touchPointId: 'zzz',
 *     language: 'EN',
 *     extra: {
 *       isPreview: true
 *     }
 *    });
 * const inlineSurvey = new hcWebsiteSdk.InlineSurvey(urlBuilder, {
 *       elementSelector: '#survey'
 *     });
 * </script>
 * ```
 */
export class InlineSurvey {
  private readonly iFrameHandle: HTMLIFrameElement;
  private readonly validator: InlineSurveyConfigValidator;
  private readonly urlFactory: UrlFactory;

  constructor(
    configBuilder: UrlBuilder,
    private inlineConfig: InlineSurveyConfig
  ) {
    this.urlFactory = configBuilder.getUrlFactory();
    this.validator = new InlineSurveyConfigValidator();
    this.validator.validateAndThrowOnErrors(inlineConfig);
    this.iFrameHandle = this.createIframeElement();
    this.reload();
  }

  /**
   * Get iframe element displaying embedded survey
   */
  public get iFrame(): HTMLIFrameElement {
    return this.iFrameHandle;
  }

  /**
   * Show survey
   */
  public show(): void {
    this.iFrameHandle.style.display = '';
  }

  /**
   * Hide survey
   */
  public hide(): void {
    this.iFrameHandle.style.display = 'none';
  }

  /**
   * Reload survey iframe with url produced bu UrlFactory
   */
  public reload(): void {
    this.iFrameHandle.src = this.urlFactory.getUrlWithParams();
  }

  /**
   * Destroy survey iframe
   */
  public destroy(): void {
    if (this.iFrame.parentElement) {
      this.iFrame.parentElement.removeChild(this.iFrame);
    }
  }

  /**
   * Creates iframe element inside parent container and returns reference to it
   *
   * @throws [[InvalidQuerySelectorException]]
   * @private
   */
  private createIframeElement(): HTMLIFrameElement {
    const root = document.querySelector(this.inlineConfig.elementSelector);
    if (!root)
      throw new InvalidQuerySelectorException(
        `[Hello Customer SDK] HTML element for ${this.inlineConfig.elementSelector} selector not found!`
      );
    const iFrame = document.createElement('iframe');
    if (this.inlineConfig.fillContainer) {
      iFrame.style.height = '100%';
      iFrame.style.width = '100%';
    }
    if (this.inlineConfig.iFrameCssClasses)
      this.inlineConfig.iFrameCssClasses.forEach((cl) =>
        iFrame.classList.add(cl)
      );
    if (this.inlineConfig.iFrameInlineStylesRules)
      Object.entries(this.inlineConfig.iFrameInlineStylesRules).forEach(
        ([key, value]) => {
          (iFrame.style as Record<string, any>)[key] = value;
        }
      );
    root.appendChild(iFrame);
    return iFrame;
  }
}
