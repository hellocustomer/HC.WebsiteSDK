import { prefixObjectKeys } from './prefix-object-keys.util';

test('prefixObjectKeys', () => {
  const obj = {
    prop1: 'aa',
    prop2: 'cc',
  };
  const result = {
    'prefix-prop1': 'aa',
    'prefix-prop2': 'cc',
  };
  expect(prefixObjectKeys(obj, 'prefix-')).toEqual(result);
});
