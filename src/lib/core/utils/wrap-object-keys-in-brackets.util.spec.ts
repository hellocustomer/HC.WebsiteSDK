import { wrapObjectKeysInBrackets } from './wrap-object-keys-in-brackets.util';

test('wrapObjectKeysInBrackets', () => {
  const input = {
    a: 10,
    b: 'aaa',
    '[c]': 1,
  };
  const result = {
    '[a]': 10,
    '[b]': 'aaa',
    '[c]': 1,
  };
  expect(wrapObjectKeysInBrackets(input)).toEqual(result);
});
