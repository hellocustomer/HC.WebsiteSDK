import { ClassNamesConfigType } from './class-names-config.type';
import { ModalSurveyStyleConfig } from './modal-survey-style-config.interface';

export interface ModalSurveyConfig {
  /**
   * @default true
   */
  closeButton?: boolean;
  /**
   * @default true
   */
  closeOnEscape?: boolean;
  /**
   * @default true
   */
  translucentBackground?: boolean;
  /**
   * @default false
   */
  showByDefault?: boolean;
  /**
   * @default true
   */
  closeOnBackgroundClick?: boolean;
  /**
   * @default false
   */
  ignoreDefaultStyles?: boolean;
  /**
   * Override default modal style
   */
  modalStyle?: ModalSurveyStyleConfig;

  /**
   * Override default modal css class names
   */
  classNames?: ClassNamesConfigType;

  /**
   * modal root container query selector
   *
   * @default body
   */
  modalContainerSelector?: string;
}
