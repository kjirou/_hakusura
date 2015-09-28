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

/**
 * e.g.
 *   (10, 0, 1)  -> 1
 *   (10, 3, 5)  -> 8
 *   (10, 5, 7)  -> 2
 *   (10, 0, -1) -> 9
 *   (0, *, *)   -> -1
 */
export function rotateIndex(length, baseIndex, relativeIndex) {
  if (length === 0) {
    return -1
  };
  return (baseIndex + relativeIndex + length) % length;
}
