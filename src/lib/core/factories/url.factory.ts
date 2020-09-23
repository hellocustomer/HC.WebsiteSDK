import { SurveyConfig } from '../interfaces/survey-config.interface';
import { attachQueryParams } from '../utils/attach-query-params.util';
import { flattenObject } from '../utils/flatten-object.util';
import { patchObject } from '../utils/patch-object.util';
import { prefixObjectKeys } from '../utils/prefix-object-keys.util';

/**
 * Class is responsible for parsing provided common configuration into url string
 */
export class UrlFactory {
  constructor(private config: SurveyConfig) {}

  private static readonly QUERY_PARAM_PREFIX = 'entry.';

  private static readonly TOUCHPOINT_TYPE = 'AskAnywhereCampaign';

  /**
   * Get full url with all attached params
   */
  public getUrlWithParams(): string {
    const flatParams = flattenObject(this.config.extra);
    const prefixedParams = prefixObjectKeys(
      flatParams,
      UrlFactory.QUERY_PARAM_PREFIX
    );
    return attachQueryParams(this.getBaseUrlWithLanguage(), prefixedParams);
  }

  /**
   * Update stored config with patch object
   * @param patch
   */
  public patchConfig(patch: Partial<SurveyConfig>) {
    this.config = patchObject(this.config, patch);
  }

  /**
   * Get target url without query params
   */
  public getBaseUrlWithLanguage(): string {
    if (this.config.language)
      return `${this.config.baseUrl}/${this.config.language}/${UrlFactory.TOUCHPOINT_TYPE}/${this.config.tenantId}/${this.config.touchPointId}`;
    else
      return `${this.config.baseUrl}/${UrlFactory.TOUCHPOINT_TYPE}/${this.config.tenantId}/${this.config.touchPointId}`;
  }
}
