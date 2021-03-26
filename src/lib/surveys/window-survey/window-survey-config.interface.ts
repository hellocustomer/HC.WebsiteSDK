import { SurveyQuarantineConfig } from '../common/survey-quarantine-config.interface';

export interface WindowSurveyConfig {
  /**
   * Specifies if the survey should be open in a new window
   *
   * @default false
   */
  openNewWindow?: boolean;
  /**
   * @default false
   */
  openOnCreation?: boolean;
  quarantineConfig?: SurveyQuarantineConfig;
}
