import LocalStorage from '../../functionality/local-storage';

describe('LocalStorage', () => {
  test('It should generate keys using your prefix', () => {
    const LSD = new LocalStorage();
    const LSC = new LocalStorage('OVO');
    expect(LSD.GenerateKey('records')).toBe('XO-records')
    expect(LSC.GenerateKey('records')).toBe('OVO-records')
  });

  test('It should remove an especific key', () => {
    const LSD = new LocalStorage();
    LSD.set('crew', ['NAV', 'The Weeknd']);
    LSD.set('leader', 'The Weeknd');
    LSD.remove('leader');
    expect(LSD.get('leader')).toBeNull()
    expect(LSD.get('crew')).toEqual(['NAV', 'The Weeknd'])

  })

  describe('Parsing', () => {
    let LSD;
    beforeAll(() => LSD = new LocalStorage());

    describe('Stringify', () => {
      test('It should return String|Number as they are', () => {
        expect(LSD.Stringify(5)).toBe(5);
        expect(LSD.Stringify('5')).toBe('5');
      })
      test('It should convert to String any Object|Array', () => {
        expect(LSD.Stringify({})).toBe('{}');
        expect(LSD.Stringify('[]')).toBe('[]');
      })
      test('It should return empty String with other types', () => {
        expect(LSD.Stringify(() => true)).toBe('');
      })
    })
    describe('Parse', () => {
      test('It should parse any valid JSON', () => {
        expect(LSD.Parse('{"name": "XO"}')).toMatchObject({name: "XO"});
        expect(LSD.Parse('{"name": []}')).toEqual({name: []});
      })
      test('It should return empty string if not valid JSON', () => {
        expect(LSD.Parse('<Invalid>')).toBe('');
      })

    })
  })
})
