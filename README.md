# HC.WebsiteSDK
## Install
## Surveys
First You have to create UrlBuilder class which stores your survey configuration and later an appropriate survey instance can be created.
### Survey Configuration
#### Example (es module)
```js
import { UrlBuilder } from 'hc.website-sdk'
const urlBuilder = new UrlBuilder({
  baseUrl: 'https://base.com',
  tenantId: 'xxx',
  touchPointId: 'zzzzz',
  language: 'EN',
  extra: {
    isPreview: true
  }
 });
  ```


#### Example (script tag)
```html
<script src="https://......./hc.website-sdk.js"></script>
<script>
    const urlBuilder = new hcWebsiteSdk.UrlBuilder({
      baseUrl: 'https://base.com',
      tenantId: 'xxx',
      touchPointId: 'zzzzz',
      language: 'EN',
      extra: {
        isPreview: true
      }
     });
</script>
  ```
Read the docs for other configuration options
## Inline survey
  #### Example (es module)
  ```js
  import { UrlBuilder, InlineSurvey } from 'hc.website-sdk'
  const urlBuilder = new UrlBuilder({
    baseUrl: 'https://base.com',
    tenantId: 'xxx',
    touchPointId: 'zzzzz',
    language: 'EN',
    extra: {
      isPreview: true
    }
  });
  const inlineSurvey = new InlineSurvey(urlBuilder, {
    elementSelector: '#survey'
  });
  ```
 
 
#### Example (script tag)
```html
<script src="https://......./hc.website-sdk.js"></script>
<script>
    const urlBuilder = new hcWebsiteSdk.UrlBuilder({
      baseUrl: 'https://base.com',
      tenantId: 'xxx',
      touchPointId: 'zzzzz',
      language: 'EN',
      extra: {
        isPreview: true
      }
     });
     const inlineSurvey = new hcWebsiteSdk.InlineSurvey(urlBuilder, {
        elementSelector: '#survey'
      });
</script>
  ```
Read the docs for other configuration options
