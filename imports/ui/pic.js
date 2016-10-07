import { Template } from 'meteor/templating';
// import { EboyPix } from '../api/eboypix.js';
import './pic.html';

Template.pic.helpers({
  // Truncate the URL and return file name only
  picName() {
    const url = this.url;
    return url.substring(url.lastIndexOf("/") + 1, url.length);
  },
  picDimensions() {
    const url = this.url;
    const img = new Image();
    img.src = url;
    // console.log('img.type: ' + img.type);
    return {
      width: img.width,
      height: img.height
    };
  },
  picBackgroundColor() {
    return this.backgroundColor;
  },
  jobName() {
    const url = this.url;
    if (url.includes('/jobs/')) {
      const slash = "/";
      const re = new RegExp(slash, 'gi');
      let results = [];
      // Populate Array with all indexes of '/'
      while (re.exec(url)) {
        results.push(re.lastIndex);
      }
      const jobNameStart = results[results.length - 2];
      const jobNameEnd = results[results.length - 1];
      return url.substring(jobNameStart, jobNameEnd - 1);
    }
  }
});
