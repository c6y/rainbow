/**
 * returns the file name from the URL
 * @param {string} url The url.
 * @return {string} The decoded file name.
 */
export function getPicName(url) {
  const picNameEncoded = url.substring(url.lastIndexOf("/") + 1, url.length);
  const picNameDecoded = decodeURIComponent(picNameEncoded);
  return picNameDecoded;
}

/**
 * returns the project name from the URL
 * given that the ultimate directory is the project name
 * checks if URL is located in the projects folder
 * @param {string} url The url.
 * @return {string} The decoded project name.
 */
export function getProjectName(url) {
  // Only do this if URL has 'projects' directory
  if (url.includes('/projects/')) {
    const slash = "/";
    const re = new RegExp(slash, 'gi');
    let results = [];
    // Populate Array with all indexes of '/'
    while (re.exec(url)) {
      results.push(re.lastIndex);
    }
    // Get location of penultimate occurence of '/'
    const projNameStart = results[results.length - 2];
    // Get location of ultimate occurence of '/'
    const projNameEnd = results[results.length - 1];
    // Cut out projectname in between
    const projNameEncoded = url.substring(projNameStart, projNameEnd - 1);
    const projNameDecoded = decodeURIComponent(projNameEncoded);
    return decodeURIComponent(projNameDecoded);
  }
}

/**
 * returns the file type from the URL
 * @param {string} url The url.
 * @return {string} The decoded project name.
 */
export function getFileType(url) {
  return url.substr(url.lastIndexOf('.') + 1);
}

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
