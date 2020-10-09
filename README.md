# HC.WebsiteSDK
## Install
The recommended approach to install this package is to do it via npm with
```npm install @hello-customer/website-touchpoint```

If You are not using npm or yarn, You have to include the script tag in your HTML code
```html
<script src="https://unpkg.com/@hello-customer/website-touchpoint"></script>
```
## Surveys
First You have to create UrlBuilder class which stores your survey configuration and later an appropriate survey instance can be created.
### Survey Configuration
#### Example (es module)
```js
import { UrlBuilder } from '@hello-customer/website-touchpoint'
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
<script src="https://unpkg.com/@hello-customer/website-touchpoint"></script>
<script>
    const urlBuilder = new hcWebsiteTouchpoint.UrlBuilder({
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
### Inline survey
  #### Example (es module)
  ```js
  import { UrlBuilder, InlineSurvey } from '@hello-customer/website-touchpoint'
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
<script src="https://unpkg.com/@hello-customer/website-touchpoint"></script>
<script>
    const urlBuilder = new hcWebsiteTouchpoint.UrlBuilder({
      baseUrl: 'https://base.com',
      tenantId: 'xxx',
      touchPointId: 'zzzzz',
      language: 'EN',
      extra: {
        isPreview: true
      }
     });
     const inlineSurvey = new hcWebsiteTouchpoint.InlineSurvey(urlBuilder, {
        elementSelector: '#survey'
      });
</script>
  ```
Read the docs for other configuration options

### Modal survey
  #### Modal structure
 
  The structure of the modal can be described as follows:
  ```html
  <div class="hello-customer-modal">
    <div class="hello-customer-modal__window">
       <div class="hello-customer-modal__bar">
           <div class="hello-customer-modal__close-button">
               ICON
           </div>
       </div>
       <iframe class="hello-customer-survey__survey"></iframe>
    </div>
  </div>
  ```
  Provided class names are the once defined by the library itself by default,
  and can be overwritten using ```classNames``` property of the configuration object.
 
  In order to modify styles attached to the modal elements using aforementioned class names,
  You can use ```modalStyle``` property of the configuration object,
  
  If You want to style the modal by Yourself, You can remove all predefined style rules by setting ```ignoreDefaultStyles``` to true.
  #### Example (es module)
  ```js
  import { UrlBuilder, InlineSurvey } from '@hello-customer/website-touchpoint'
  const urlBuilder = new UrlBuilder({
    baseUrl: 'https://base.com',
    language: 'EN',
    tenantId: 'xxxx',
    touchPointId: 'zzz',
    extra: {
      isPreview: true
    }
  });
  const modalSurvey = new ModalSurvey(urlBuilder, {});
  ```
  #### Example (script tag)
  ```html
  <script src="https://unpkg.com/@hello-customer/website-touchpoint"></script>
  <script>
  const urlBuilder = new hcWebsiteTouchpoint.UrlBuilder({
      baseUrl: 'https://base.com',
      tenantId: 'xxxx',
      touchPointId: 'zzz',
      language: 'EN',
      extra: {
        isPreview: true
      }
     });
  const modalSurvey = new hcWebsiteTouchpoint.ModalSurvey(urlBuilder, {});
  </script>
  ```
Read the docs for other configuration options.

### Window survey
  #### Example (es module)
  ```js
  import { UrlBuilder, WindowSurvey } from '@hello-customer/website-touchpoint'
  const urlBuilder = new UrlBuilder({
    baseUrl: 'https://base.com',
    tenantId: 'xxx',
    touchPointId: 'zzzzz',
    language: 'EN',
    extra: {
      isPreview: true
    }
  });
  const inlineSurvey = new WindowSurvey(urlBuilder, {
    openNewWindow: true
  });
  ```
 
 
#### Example (script tag)
```html
<script src="https://unpkg.com/@hello-customer/website-touchpoint"></script>
<script>
    const urlBuilder = new hcWebsiteTouchpoint.UrlBuilder({
      baseUrl: 'https://base.com',
      tenantId: 'xxx',
      touchPointId: 'zzzzz',
      language: 'EN',
      extra: {
        isPreview: true
      }
     });
     const inlineSurvey = new hcWebsiteTouchpoint.WindowSurvey(urlBuilder, {
        openNewWindow: true
      });
</script>
  ```
Read the docs for other configuration options
