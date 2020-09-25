import { InvalidQuerySelectorException } from '../../core/exceptions/invalid-query-selector.exception';
import { StyledElementFactory } from '../../core/factories/styled-element.factory';
import { UrlFactory } from '../../core/factories/url.factory';
import { trueByDefault } from '../../core/utils/true-by-default.util';
import { UrlBuilder } from '../../url-builder/url.builder';

import { ClassNamesConfigType } from './class-names-config.type';
import { ModalSurveyConfig } from './modal-survey-config.interface';
import * as modalDefaultStyles from './modal-survey-defaults.style';
import { modalSurveyLogoFactory } from './modal-survey-logo.element-factory';
import { ModalSurveyStyleConfig } from './modal-survey-style-config.interface';
import { ModalSurveyConfigValidator } from './modal-survey.config-validator';
import { closeIconSvgElementFactory } from './modal-survey.svg-factory';

/**
 * Class builds a modal with iframe, providing multiple configuration options.
 * All styles and class names used by the library can be easily overwritten,
 * by passing new values in the configuration object.
 *
 * ### Modal structure
 *
 * The structure of the modal can be described as follows:
 * ```html
 * <div class="hello-customer-modal">
 *   <div class="hello-customer-modal__window">
 *      <div class="hello-customer-modal__bar">
 *          <div class="hello-customer-modal__close-button">
 *              ICON
 *          </div>
 *      </div>
 *      <iframe class="hello-customer-survey__survey"></iframe>
 *   </div>
 * </div>
 * ```
 * Provided class names are the once defined by the library itself by default,
 * and can be overwritten using ```classNames``` property of the configuration object.
 *
 * In order to modify styles attached to the modal elements using aforementioned class names,
 * You can use ```modalStyle``` property of the configuration object,
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
 * const modalSurvey = new ModalSurvey(urlBuilder, {});
 * ```
 * ### Example (script tag)
 * ```html
 * <script src="https://......./website-touchpoint.js"></script>
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
 * const modalSurvey = new  hcWebsiteTouchpoint.ModalSurvey(urlBuilder, {});
 * </script>
 * ```
 *
 * @category Surveys
 */
export class ModalSurvey {
  private readonly iFrameHandle: HTMLIFrameElement;
  private readonly modalHandle: HTMLDivElement;
  private readonly urlFactory: UrlFactory;
  private readonly validator: ModalSurveyConfigValidator;

  constructor(
    configBuilder: UrlBuilder,
    private modalConfig: ModalSurveyConfig
  ) {
    this.urlFactory = configBuilder.getUrlFactory();
    this.validator = new ModalSurveyConfigValidator();
    this.validator.validateAndThrowOnErrors(modalConfig);
    const [root, frame] = this.createModal();
    this.iFrameHandle = frame;
    this.modalHandle = root;
    if (!this.modalConfig.ignoreDefaultStyles) this.initModalClasses();
    this.reload();
    if (this.modalConfig.showByDefault) this.show();
    else this.close();
  }

  public get modalContainer(): HTMLDivElement {
    return this.modalHandle;
  }

  public get iFrame(): HTMLIFrameElement {
    return this.iFrameHandle;
  }

  /**
   * Close modal window
   */
  public close(): void {
    const styleClasses = this.getClassNames();
    this.modalHandle.classList.remove(styleClasses.modalVisible);
  }

  /**
   * Open modal window
   */
  public show(): void {
    const styleClasses = this.getClassNames();
    this.modalHandle.classList.add(styleClasses.modalVisible);
  }

  /**
   * Reload iframe content using url from attached url factory object
   */
  public reload(): void {
    this.iFrameHandle.src = this.urlFactory.getUrlWithParams();
  }

  private getModalStyle(): Required<ModalSurveyStyleConfig> {
    return {
      rootDivStyle: this.modalConfig.ignoreDefaultStyles
        ? this.modalConfig?.modalStyle?.rootDivStyle || {}
        : {
            ...modalDefaultStyles.rootDivStyle,
            ...this.modalConfig?.modalStyle?.rootDivStyle,
          },
      iFrameStyle: this.modalConfig.ignoreDefaultStyles
        ? this.modalConfig?.modalStyle?.iFrameStyle || {}
        : {
            ...modalDefaultStyles.iFrameStyle,
            ...this.modalConfig?.modalStyle?.iFrameStyle,
          },
      windowBarDivStyle: this.modalConfig.ignoreDefaultStyles
        ? this.modalConfig?.modalStyle?.windowBarDivStyle || {}
        : {
            ...modalDefaultStyles.windowBarDivStyle,
            ...this.modalConfig?.modalStyle?.windowBarDivStyle,
          },
      windowCloseButtonStyle: this.modalConfig.ignoreDefaultStyles
        ? this.modalConfig?.modalStyle?.windowCloseButtonStyle || {}
        : {
            ...modalDefaultStyles.windowCloseButtonStyle,
            ...this.modalConfig?.modalStyle?.windowCloseButtonStyle,
          },
      windowDivStyle: this.modalConfig.ignoreDefaultStyles
        ? this.modalConfig?.modalStyle?.windowDivStyle || {}
        : {
            ...modalDefaultStyles.windowDivStyle,
            ...this.modalConfig?.modalStyle?.windowDivStyle,
          },
      modalTranslucentBackground: this.modalConfig.ignoreDefaultStyles
        ? this.modalConfig?.modalStyle?.modalTranslucentBackground || {}
        : {
            ...modalDefaultStyles.modalTranslucentBackground,
            ...this.modalConfig?.modalStyle?.modalTranslucentBackground,
          },
      modalVisible: this.modalConfig.ignoreDefaultStyles
        ? this.modalConfig?.modalStyle?.modalVisible || {}
        : {
            ...modalDefaultStyles.modalVisible,
            ...this.modalConfig?.modalStyle?.modalVisible,
          },
      footerStyle: this.modalConfig.ignoreDefaultStyles
        ? this.modalConfig?.modalStyle?.footerStyle || {}
        : {
            ...modalDefaultStyles.footerStyle,
            ...this.modalConfig?.modalStyle?.footerStyle,
          },
      footerLogoStyle: this.modalConfig.ignoreDefaultStyles
        ? this.modalConfig?.modalStyle?.footerLogoStyle || {}
        : {
            ...modalDefaultStyles.logoStyle,
            ...this.modalConfig?.modalStyle?.footerLogoStyle,
          },
    };
  }

  private getClassNames(): Required<ClassNamesConfigType> {
    return {
      rootDivStyle:
        this.modalConfig?.classNames?.rootDivStyle ||
        modalDefaultStyles.classNames.rootDivStyle,
      windowBarDivStyle:
        this.modalConfig?.classNames?.windowBarDivStyle ||
        modalDefaultStyles.classNames.windowBarDivStyle,
      windowDivStyle:
        this.modalConfig?.classNames?.windowDivStyle ||
        modalDefaultStyles.classNames.windowDivStyle,
      windowCloseButtonStyle:
        this.modalConfig?.classNames?.windowCloseButtonStyle ||
        modalDefaultStyles.classNames.windowCloseButtonStyle,
      iFrameStyle:
        this.modalConfig?.classNames?.iFrameStyle ||
        modalDefaultStyles.classNames.iFrameStyle,
      modalVisible:
        this.modalConfig?.classNames?.modalVisible ||
        modalDefaultStyles.classNames.modalVisible,
      modalTranslucentBackground:
        this.modalConfig?.classNames?.modalTranslucentBackground ||
        modalDefaultStyles.classNames.modalTranslucentBackground,
      footerStyle:
        this.modalConfig?.classNames?.footerStyle ||
        modalDefaultStyles.classNames.footerStyle,
      footerLogoStyle:
        this.modalConfig?.classNames?.footerLogoStyle ||
        modalDefaultStyles.classNames.footerLogoStyle,
    };
  }

  /**
   * Init modal state classes
   *
   * @private
   */
  private initModalClasses(): void {
    const modalStyle = this.getModalStyle();
    const styleClasses = this.getClassNames();
    StyledElementFactory.appendCssClassToHeader(
      modalStyle.modalVisible,
      styleClasses.modalVisible
    );
    Object.entries(modalDefaultStyles.medias).forEach(([media, rules]) =>
      StyledElementFactory.addMediaRule(
        media,
        Object.entries(rules).reduce(
          (total, current) => ({
            ...total,
            [styleClasses[current[0] as keyof ModalSurveyStyleConfig]]:
              current[1],
          }),
          {}
        )
      )
    );
  }

  /**
   * Creates modal using provided or default configuration
   *
   * @private
   */
  private createModal(): [HTMLDivElement, HTMLIFrameElement] {
    const modalStyle = this.getModalStyle();
    const styleClasses = this.getClassNames();
    const iFrame = new StyledElementFactory(
      document.createElement('iframe')
    ).applyClass(styleClasses.iFrameStyle, modalStyle.iFrameStyle)
      .styledElement;

    const footer = new StyledElementFactory(
      document.createElement('div')
    ).applyClass(styleClasses.footerStyle, modalStyle.footerStyle)
      .styledElement;
    footer.appendChild(
      modalSurveyLogoFactory(
        styleClasses.footerLogoStyle,
        modalStyle.footerLogoStyle
      )
    );

    const closeButton = new StyledElementFactory(
      document.createElement('div')
    ).applyClass(
      styleClasses.windowCloseButtonStyle,
      modalStyle.windowCloseButtonStyle
    ).styledElement;
    closeButton.appendChild(closeIconSvgElementFactory('#eeeeee'));

    const windowBar = new StyledElementFactory(
      document.createElement('div')
    ).applyClass(styleClasses.windowBarDivStyle, modalStyle.windowBarDivStyle)
      .styledElement;

    const windowDiv = new StyledElementFactory(
      document.createElement('div')
    ).applyClass(styleClasses.windowDivStyle, modalStyle.windowDivStyle)
      .styledElement;
    windowDiv.appendChild(windowBar);
    windowDiv.appendChild(iFrame);
    windowDiv.appendChild(footer);

    const modalRoot = new StyledElementFactory(document.createElement('div'))
      .applyClass(styleClasses.rootDivStyle, modalStyle.rootDivStyle)
      .applyClassConditionally(
        trueByDefault(this.modalConfig.translucentBackground),
        styleClasses.modalTranslucentBackground,
        modalStyle.modalTranslucentBackground
      ).styledElement;
    modalRoot.appendChild(windowDiv);

    // add behaviour
    if (trueByDefault(this.modalConfig.closeButton)) {
      windowBar.appendChild(closeButton);
      closeButton.addEventListener('click', () => this.close());
    }
    windowDiv.addEventListener('click', (e) => e.stopPropagation());
    if (trueByDefault(this.modalConfig.closeOnEscape)) {
      window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' || event.key === 'Esc') this.close();
      });
    }
    if (trueByDefault(this.modalConfig.closeOnBackgroundClick))
      modalRoot.addEventListener('click', () => this.close());
    if (this.modalConfig.modalContainerSelector) {
      const root = document.querySelector(
        this.modalConfig.modalContainerSelector
      );
      if (!root)
        throw new InvalidQuerySelectorException(
          `[Hello Customer SDK] HTML element for ${this.modalConfig.modalContainerSelector} selector not found!`
        );
      root.appendChild(modalRoot);
    } else document.body.appendChild(modalRoot);
    return [modalRoot, iFrame];
  }
}
