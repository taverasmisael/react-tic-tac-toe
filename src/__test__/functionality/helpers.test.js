import {
  eq,
  identity,
  notIdentity,
  dynamicClass,
  inc,
  extend
} from '../../functionality/helpers';

describe('Simple Helpers', () => {
  describe('eq', () => {
    test('It should make primitives extrict comparsion', () => {
      expect(eq(1, 1)).toBe(true);
      expect(eq(true, false)).not.toBe(true);
      expect(eq('SOLO', 'solo')).not.toBe(true);
      expect(eq('solo', 'solo')).toBe(true);
    });
    test('It should not work on Objects, Arrays or Functions', () => {
      expect(eq([], [])).toBe(false);
      expect(eq({}, {})).toBe(false);
      expect(eq(() => true, () => true)).toBe(false)
    });
  });

  describe('identity', () => {
    test('It should always return the same param', () => {
      expect(identity([])).toEqual([]);
      expect(identity({})).toEqual({});
      expect(identity([{}])).toEqual([{}]);
      expect(identity(0)).toBe(0);
    });
  });

  describe('notIdentity', () => {
    test('It should return the oposite boolean value of the given param', () => {
      expect(notIdentity([])).toBe(false);
      expect(notIdentity({})).toBe(false);
      expect(notIdentity([{}])).toBe(false);
      expect(notIdentity(0)).toBe(true);
    });
  });

  describe('inc', () => {
    test('It should increments by one the given number', () => {
      expect(inc(5)).toBe(6);
      expect(inc(-1)).toBe(0);
    });
  });
  describe('extend', () => {
    let baseObject;
    beforeEach(() => { baseObject = {name: 'XO'};})

    test('It should return baseObject if passed undefined or empty object', () => {
      expect(extend(baseObject, {})).toEqual(baseObject);
      expect(extend(baseObject)).toEqual(baseObject);
    });

    test('It should EXTEND baseObject by any given extra objects', () => {
      expect(extend(baseObject, {lastName: 'Records'})).toMatchObject({lastName: 'Records'})
      expect(extend(baseObject, {lastName: 'Records'}, {artists: expect.any(Array)}))
        .toMatchObject(({lastName: 'Records', artists: expect.any(Array)}))
    })

    test('It should replace properties passed by last in baseObject', () => {
      const OVO = {name: 'OVO'};
      expect(extend(baseObject, OVO)).not.toEqual(baseObject);
      expect(extend(baseObject, OVO)).toEqual(OVO);
      expect(extend(baseObject, OVO, {name: 'TG'})).not.toEqual(OVO);
    })

    test('It should ignore numeric params', () => {
      expect(extend(baseObject, 5)).toEqual(baseObject);
    })

    test('It should extend Array|String by index', () => {
      const OVO = 'OVO';
      expect(extend(baseObject, OVO)).toMatchObject({0: 'O', 1: 'V', 2: 'O'});
      expect(extend(baseObject, ['O', 'V', 'O'])).toMatchObject({0: 'O', 1: 'V', 2: 'O'});
      expect(extend(baseObject, [3, 2, 1])).toMatchObject({0: 3, 1: 2, 2: 1});
    })
  });

  describe('dynamicClass', () => {
    let base, extras;
    beforeEach(() => {base = 'class'; extras = ['class--modifier-1', 'class--modifier-2']})
    test('It should apply always the base clase', () => {
      expect(dynamicClass(base, extras, true)).toMatch(base);
      expect(dynamicClass(base, extras, false)).toMatch(base);
    })
    test('It should only apply extras is predicate is true', () => {
      expect(dynamicClass(base, extras, true)).toMatch(extras.join(' '));
      expect(dynamicClass(base, extras, false)).toMatch(base);
      expect(dynamicClass(base, extras, false)).not.toMatch(extras.join(' '));
    })
    test('It should only apply extra as string not array is predicate is true', () => {
      expect(dynamicClass(base, 'extras', true)).toMatch('extras');
      expect(dynamicClass(base, 'extras', false)).toMatch(base);
      expect(dynamicClass(base, 'extras', false)).not.toMatch('extras');
    })
  })
});
