import { attachQueryParams } from './attach-query-params.util';

test('attachQueryParams', () => {
  const params = {
    a: 10,
    b: 'test',
  };
  expect(attachQueryParams('base.com', params)).toBe('base.com?a=10&b=test');
});
