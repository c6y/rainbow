/**
 * returns the file type from the URL
 * @param {string} url The url.
 * @return {string} The decoded project name.
 */
export function getFileType(url) {
  return url.substr(url.lastIndexOf('.') + 1);
}
