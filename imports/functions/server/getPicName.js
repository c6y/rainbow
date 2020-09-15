/**
 * returns the file name from the URL
 * @param {string} url The url.
 * @return {string} The decoded file name.
 */
export function getPicName(url) {
  const picNameEncoded = url.substring(url.lastIndexOf('/') + 1, url.length);
  const picNameDecoded = decodeURIComponent(picNameEncoded);
  return picNameDecoded;
}
