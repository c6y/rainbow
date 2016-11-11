import { cleanString } from './cleanString.js';

/**
 * takes a dirty string and returns a sanitized tags array
 * uses the cleanString() function
 * converts tags to lower case
 * replaces white space within words with a minus
 * removes remaining whitespace and trailing comma
 * @param {string} tagString ring The dirty tags string.
 * @return {array} An array with tags.
 */
export function tagsToArray(tagString) {
  const tags = cleanString(tagString);
  // populate array
  const tagsArray = tags.split(',');
  return tagsArray;
}
