export const eq = (obj1, obj2) => obj1 === obj2;
export const identity = el => el;
export const notIdentity = el => !identity(el);

/**
 *
 * @param {String} base This Class ALWAYS will be applied to the element/component
 * @param {Array<String>} extra All the other classes we want to apply to the element if the predicate is true
 * @param {Boolean} predicate This condition determinates if the extra classes are aplied or not
 * @returns {String} All the classes the element need based on the @param predicate
 */
export const dynamicClass = (base, extra, predicate) =>
  predicate ? `${base} ${extra.join(' ')}` : base;

/**
 * This function increments by one the passed value
 * @param {Number} x Any valid Integer
 * @returns {Number} x + 1
 */
export const inc = (x) => x + 1

/**
 * This function is syntax sugar for Object.assign but for objects only
 * You must be careful with the order you pass the options, the lasts objects
 * will overwrite the firsts
 * @param {Object} base The main object upon which will build the new one
 * @param {...Object} options Individual objects wich  will mutate the base
 * @returns{Object} this is the combination of the base mutated by the options
 */
export const extend = (base, ...options) => Object.assign({}, base, ...options)
