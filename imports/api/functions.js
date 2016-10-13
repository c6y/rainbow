/**
 * gets the file name from the URL
 * @param {string} url The url.
 * @return {string} The decoded file name.
 */
export function getPicName(url) {
  const picNameEncoded = url.substring(url.lastIndexOf("/") + 1, url.length);
  const picNameDecoded = decodeURIComponent(picNameEncoded);
  return picNameDecoded;
}

/**
 * gets the project name from the URL
 * given that the ultimate directory is the project name
 * checks if URL is located in the projects folder
 * @param {string} url The url.
 * @return {string} The decoded project name.
 */
export function getProjectName(url) {
  // Only do this if URL has 'projects' directory
  if (url.includes('/projects/')) {
    const pStart = "/-";
    const pEnd = "-/";
    const projNameEncoded = url.substring(
      url.lastIndexOf(pStart) + pStart.length,
      url.lastIndexOf(pEnd)
    );
    console.log('projNameEncoded: ' + projNameEncoded);
    const projNameDecoded = decodeURIComponent(projNameEncoded);
    return projNameDecoded;
  }
}
// export function getProjectName(url) {
//   // Only do this if URL has 'projects' directory
//   if (url.includes('/projects/')) {
//     const slash = "/";
//     const re = new RegExp(slash, 'gi');
//     let results = [];
//     // Populate Array with all indexes of '/'
//     while (re.exec(url)) {
//       results.push(re.lastIndex);
//     }
//     // Get location of penultimate occurence of '/'
//     const projNameStart = results[results.length - 2];
//     // Get location of ultimate occurence of '/'
//     const projNameEnd = results[results.length - 1];
//     // Cut out projectname in between
//     const projNameEncoded = url.substring(projNameStart, projNameEnd - 1);
//     const projNameDecoded = decodeURIComponent(projNameEncoded);
//     return decodeURIComponent(projNameDecoded);
//   }
// }

/**
 * returns the file type from the URL
 * @param {string} url The url.
 * @return {string} The decoded project name.
 */
export function getFileType(url) {
  return url.substr(url.lastIndexOf('.') + 1);
}
