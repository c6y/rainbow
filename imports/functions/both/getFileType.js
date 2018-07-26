/**
 * returns the file type from a string, usually a URL or a file name
 * @param {string} string The string.
 * @return {string} The file extension.
 */
export function getFileType(string) {
  // return string.substr(string.lastIndexOf('.') + 1);
  return string.split('.').pop();
}
