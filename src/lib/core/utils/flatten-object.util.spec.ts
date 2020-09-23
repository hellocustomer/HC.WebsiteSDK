import { flattenObject } from './flatten-object.util';

test('flattenObject', () => {
  const obj = {
    a: {
      b: {
        c: {
          d: 10,
        },
      },
    },
  };
  const result = {
    'a.b.c.d': 10,
  };
  expect(flattenObject(obj)).toEqual(result);
});
