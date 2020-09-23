import { UrlFactory } from './url.factory';

describe('UrlFactory', () => {
  let urlFactory: UrlFactory;

  beforeEach(() => {
    urlFactory = new UrlFactory({
      baseUrl: 'https://hello.com',
      tenantId: 'xxxxx',
      touchPointId: 'zzzzzzzz',
      language: 'EN',
      extra: {
        score: 10,
        respondent: {
          lastname: 'xxx',
        },
        metadata: {
          '[test]': '123',
        },
      },
    });
  });

  test('urlFactory.getBaseUrlWithLanguage', () => {
    expect(urlFactory.getBaseUrlWithLanguage()).toEqual(
      'https://hello.com/EN/AskAnywhereCampaign/xxxxx/zzzzzzzz'
    );
  });

  test('urlFactory.getUrlWithParams', () => {
    expect(urlFactory.getUrlWithParams()).toBe(
      'https://hello.com/EN/AskAnywhereCampaign/xxxxx/zzzzzzzz?entry.score=10&entry.respondent.lastname=xxx&entry.metadata[test]=123'
    );
  });
});
