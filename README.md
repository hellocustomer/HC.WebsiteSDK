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
Please consult the docs for more [configuration options](https://hellocustomer.github.io/HC.WebsiteSDK/interfaces/surveyconfig.html).

***

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
Please consult the docs for more [configuration options](https://hellocustomer.github.io/HC.WebsiteSDK/interfaces/inlinesurveyconfig.html).

***

### Modal survey
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
Please consult the docs for more [configuration options](https://hellocustomer.github.io/HC.WebsiteSDK/interfaces/modalsurveyconfig.html).

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
  
#### Modal styling example
 
  The following example shows how to change the color of the modal top bar:
  ```js
  import { UrlBuilder, InlineSurvey } from '@hello-customer/website-touchpoint'
  const urlBuilder = new UrlBuilder({...});
  const modalSurvey = new ModalSurvey(urlBuilder, {
    modalStyle: {
      windowBarDivStyle: {
        backgroundColor: '#04c48e'
      }
    }
  });
  ```
  [Other parts of the modal](https://hellocustomer.github.io/HC.WebsiteSDK/interfaces/modalsurveystyleconfig.html) can be styled in the same way (any valid CSS property can be used for them).
***

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
Please consult the docs for more [configuration options](https://hellocustomer.github.io/HC.WebsiteSDK/interfaces/windowsurveyconfig.html).
