import { SurveyQuarantineConfig } from '../common/survey-quarantine-config.interface';

export interface InlineSurveyConfig {
  elementSelector: string;
  fillContainer?: boolean;
  iFrameCssClasses?: string[];
  iFrameInlineStylesRules?: Partial<CSSStyleDeclaration>;
  quarantineConfig?: SurveyQuarantineConfig;
}
