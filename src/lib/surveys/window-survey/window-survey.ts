import { CannotOpenWindowException } from '../../core/exceptions/cannot-open-window.exception';
import { UrlFactory } from '../../core/factories/url.factory';
import { UrlBuilder } from '../../url-builder/url.builder';

import { WindowSurveyConfig } from './window-survey-config.interface';
import { WindowSurveyConfigValidator } from './window-survey.config-validator';

/**
 * Class for opening survey in a new tab/window
 *
 * In the ```openNewWindow``` You can specify if the survey should be opened in a new window,
 * otherwise only a new tab will be created
 *
 * ### Example (es module)
 * ```js
 * import { UrlBuilder, WindowSurvey } from '@hello-customer/website-touchpoint'
 * const urlBuilder = new UrlBuilder({
 *   baseUrl: 'https://base.com',
 *   language: 'EN',
 *   tenantId: 'xxxx',
 *   touchPointId: 'zzz',
 *   extra: {
 *     isPreview: true
 *   }
 * });
 * const inlineSurvey = new WindowSurvey(urlBuilder, {
 *   openNewWindow: true
 * });
 * ```
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
 * const inlineSurvey = new hcWebsiteTouchpoint.WindowSurvey(urlBuilder, {
 *       openNewWindow: true
 *     });
 * </script>
 * ```
 * @category Surveys
 */
export class WindowSurvey {
  private windowHandle: Window | undefined | null;
  private readonly urlFactory: UrlFactory;
  private readonly validator: WindowSurveyConfigValidator;

  constructor(
    configBuilder: UrlBuilder,
    private windowConfig: WindowSurveyConfig
  ) {
    this.urlFactory = configBuilder.getUrlFactory();
    this.validator = new WindowSurveyConfigValidator();
    this.validator.validateAndThrowOnErrors(windowConfig);
    if (this.windowConfig.openOnCreation) this.open();
  }

  get window(): Window | null | undefined {
    return this.windowHandle;
  }

  /**
   * Open survey
   */
  public open(): void {
    if (this.windowConfig.openNewWindow)
      this.windowHandle = window.open(
        this.urlFactory.getUrlWithParams(),
        '_blank',
        'toolbar=0,location=0,menubar=0,height=800,width=700'
      );
    else
      this.windowHandle = window.open(
        this.urlFactory.getUrlWithParams(),
        '_blank'
      );
    if (!this.windowHandle) throw new CannotOpenWindowException();
  }

  /**
   * Close survey
   */
  public close(): void {
    if (this.windowHandle) this.windowHandle.close();
  }
}
