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
