import chalk from 'chalk';

import conf from 'conf';


export function createCounter(start = 1) {
  start -= 1;
  return () => start += 1;
}

export function calculateMillisecondsPerFrame() {
  return ~~(1000 / conf.fps);
}

/*
 * Convert from array<object> to object
 *
 * @param {array<object>} list
 * @param {string} propertyName
 * @return {Object}
 */
export function dictionarize(list, propertyName) {
  let dict = {};
  list.forEach(v => dict[v[propertyName]] = v);
  return dict;
}
