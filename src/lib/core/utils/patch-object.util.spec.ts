import { patchObject } from './patch-object.util';

test('patchObject', () => {
  const obj = {
    a: 10,
    b: {
      c: 15,
    },
  };
  const patch = {
    b: {
      c: 20,
    },
  };
  const result = {
    a: 10,
    b: {
      c: 20,
    },
  };
  const patched = patchObject(obj, patch);
  expect(patched).toEqual(result);
});
