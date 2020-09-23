import { SurveyMetadata } from './survey-metadata.interface';
import { SurveyRespondent } from './survey-respondent.interface';

export interface SurveyExtraConfig {
  score?: number;
  isPreview?: boolean;
  respondent?: SurveyRespondent;
  metadata?: SurveyMetadata;
}
