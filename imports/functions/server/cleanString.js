/**
 * returns a sanitized string
 * converts string to lower case
 * replaces white space within words with a minus
 * removes remaining whitespace and trailing comma
 * @param {string} dirtyString The dirty string.
 * @return {string} A clean string.
 */
export function cleanString(dirtyString) {
  // convert to lower case
  let string = dirtyString.toLowerCase();
  // remove space after commas
  string = string.replace(/,\s+/ig, ',');
  // remove space before commas
  string = string.replace(/\s+,/ig, ',');
  // remove remaining space and replace with '-'
  string = string.replace(/\s+/ig, '-');
  // remove repeating ','
  string = string.replace(/,+/g, ',');
  // remove trailing comma
  string = string.replace(/,+$/g, '');
  // remove remaining whitespace
  string = string.replace(/\s+$/g, '');
  return string;
}
