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
