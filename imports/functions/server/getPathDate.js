/**
  * returns the year from the URL path
  * given that the URL contains a four digit year directory
  * check if URL has a year folder, such as '/2017/'
  * converts the year number into a Date object
  * @param {string} url The url.
  * @return {Date} dateObject The project date.
  */
export function getPathDate(url) {
  const regexYearDir = /\/\d{4}\//gi;
  const yearDir = url.match(regexYearDir);
  if (yearDir) {
    const yearDirString = String(url.match(regexYearDir));
    const regexYear = /\d{4}/gi;
    const yearNumber = Number(yearDirString.match(regexYear));
    const dateObject = new Date(Date.UTC(yearNumber, 0, 1));
    return dateObject;
  }
}
