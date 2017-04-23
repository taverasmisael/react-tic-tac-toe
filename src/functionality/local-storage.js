// @flow
export default class LocalStorage {
  static secretPrefix;

  constructor(prefix = 'XO') {
    this.secretprefix = prefix;
  }

  /**
   * This function set any value to the local storage. It will generate a key
   * with {LocalStorage.GenerateKey} and {LocalStorage.Stringify} the value.
   * @param {String} key This is the entry key. It will be merged with your secretPrefix
   * @param {Any} value Any value will be {LocalStorage.Strigify}\
   * @returns {Any}
   */
  set(key, value) {
    const item = this.GenerateKey(key);

    localStorage.setItem(item, this.Stringify(value));
    return this.get(key);
  }

  /**
   * This method return the item stored with under the passed key. If the key already contains the
   * secretPrefix it look for it, if not it genereates the key.
   * @param {String} key The Object Key wich saved the object. It can contain the secretPrefix or not
   * @returns {Any|null}
   */
  get(key) {
    const item = key.includes(this.secretprefix) ? key : this.GenerateKey(key);

    return this.Parse(localStorage.getItem(item));
  }

  /**
   * This function will remove permanently from local storage our object
   * @param {String} key The Object key wich store the value
   * @returns {undefined}
   */
  remove(key) {
    const item = this.GenerateKey(key);
    return localStorage.removeItem(item);
  }

  /**
   * This function will delete ALL entries in localStorage wich contains our secret prefix
   */
  clear() {
    for (let key in localStorage) {
      if (key.includes(this.secretprefix)) localStorage.removeItem(key);
    }
  }

  // Private Functions

  /**
   * This method generates a uniq key by merging the passed key it with the secretPrefix
   * @param {String} key The basic key without our secretPrefix
   * @returns {String}
   */
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

  /**
   * This method takes any paramether and according to its type returns the value itself or a JSON.stringify Version of the value
   * @param {Any} value This is the value we will stringify
   * @return {String}
   */
  Stringify(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      return value.toString();
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
