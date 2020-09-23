import { SurveyExtraConfig } from './survey-extra-config.interface';

export interface SurveyConfig {
  touchPointId: string;
  tenantId: string;
  baseUrl: string;
  language?: string;
  extra?: SurveyExtraConfig;
}
