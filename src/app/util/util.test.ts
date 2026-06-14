import {
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isFalse,
  isNullUndefined,
  isTrue,
  makeId,
  objectAHasSameKeysAsObjectB,
  objectInstanceProvider,
  objectKeyExists,
} from './util';

describe('util', () => {
  describe('isEmptyString', () => {
    it('treats blank and non-string values as empty', () => {
      expect(isEmptyString('')).toBe(true);
      expect(isEmptyString('   ')).toBe(true);
      expect(isEmptyString(null)).toBe(true);
      expect(isEmptyString(undefined)).toBe(true);
      expect(isEmptyString(42)).toBe(true);
    });

    it('recognizes non-empty strings', () => {
      expect(isEmptyString('hello')).toBe(false);
    });
  });

  describe('isNullUndefined', () => {
    it('detects null and undefined only', () => {
      expect(isNullUndefined(null)).toBe(true);
      expect(isNullUndefined(undefined)).toBe(true);
      expect(isNullUndefined(0)).toBe(false);
      expect(isNullUndefined('')).toBe(false);
      expect(isNullUndefined(false)).toBe(false);
    });
  });

  describe('isEmptyArray / isEmptyObject', () => {
    it('detects empty collections', () => {
      expect(isEmptyArray([])).toBe(true);
      expect(isEmptyArray([1])).toBe(false);
      expect(isEmptyObject({})).toBe(true);
      expect(isEmptyObject({ a: 1 })).toBe(false);
    });
  });

  describe('objectKeyExists', () => {
    it('checks own properties', () => {
      expect(objectKeyExists({ a: 1 }, 'a')).toBe(true);
      expect(objectKeyExists({ a: 1 }, 'b')).toBe(false);
    });
  });

  describe('isTrue / isFalse', () => {
    it('only accepts real booleans', () => {
      expect(isTrue(true)).toBe(true);
      expect(isTrue(1)).toBe(false);
      expect(isFalse(false)).toBe(true);
      expect(isFalse(0)).toBe(false);
    });
  });

  describe('objectInstanceProvider', () => {
    it('returns a fresh copy of objects and arrays', () => {
      const obj = { a: 1 };
      const objCopy = objectInstanceProvider(obj);
      expect(objCopy).toEqual(obj);
      expect(objCopy).not.toBe(obj);

      const arr = [1, 2];
      const arrCopy = objectInstanceProvider(arr);
      expect(arrCopy).toEqual(arr);
      expect(arrCopy).not.toBe(arr);
    });
  });

  describe('makeId', () => {
    it('generates an alphanumeric id of the requested length', () => {
      const id = makeId(12);
      expect(id).toHaveLength(12);
      expect(id).toMatch(/^[A-Za-z0-9]+$/);
    });
  });

  describe('objectAHasSameKeysAsObjectB', () => {
    it('returns true for objects with the same keys', () => {
      expect(objectAHasSameKeysAsObjectB({ a: 1, b: 2 }, { a: 3, b: 4 })).toBe(true);
      expect(objectAHasSameKeysAsObjectB({}, {})).toBe(true);
    });

    it('returns false when a key in objA is missing from objB', () => {
      expect(objectAHasSameKeysAsObjectB({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });

    it('returns false when key counts differ even if keys otherwise match', () => {
      expect(objectAHasSameKeysAsObjectB({ a: 1 }, { a: 1, b: 2 })).toBe(false);
      expect(objectAHasSameKeysAsObjectB({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });
  });
});
