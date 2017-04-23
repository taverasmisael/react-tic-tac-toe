export default class LocalStorage {
  static secretPrefix;

  constructor(prefix = 'XO') {
    this.secretprefix = prefix;
  }

  list() {
    let items = [];
    for (let key in localStorage) {
      if (key.includes(this.secretprefix)) {
        items = [
          ...items,
          {
            [key]: this.Parse(this.get(key))
          }
        ];
      }
    }

    return items;
  }

  set(key, value) {
    const item = this.GenerateKey(key);

    localStorage.setItem(item, this.Stringify(value));
    return this.get(key);
  }

  get(key) {
    const item = key.includes(this.secretprefix) ? key : this.GenerateKey(key);

    return this.Parse(localStorage.getItem(item));
  }

  remove(key) {
    const item = this.GenerateKey(key);

    return localStorage.removeItem(item);
  }

  clear() {
    for (let key in localStorage) {
      if (key.includes(this.secretprefix)) localStorage.removeItem(key);
    }
  }

  // Private Functions
  GenerateKey(key) {
    return `${this.secretprefix}-${key}`;
  }

  Parse(value) {
    try {
      return JSON.parse(value);
    } catch (exception) {
      return '';
    }
  }

  Stringify(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    } else if (typeof value === 'object') {
      try {
        return JSON.stringify(value);
      } catch (exception) {
        return '';
      }
    } else {
      return '';
    }
  }
}
