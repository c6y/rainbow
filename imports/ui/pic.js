import { Template } from 'meteor/templating';
import { EboyPix } from '../api/eboypix.js';
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
      width: img.width * 0.5,
      height: img.height * 0.5
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
  },
  jobName2() {
    // Checks if URL contains a jobs directory
    // if true extracts the last directory (which should be the jobname)
    const url = this.url;
    if (url.includes('/jobs/')) {
      // Reverse URL so we can use split on the end of the string
      const reversedURL = url.split('').reverse().join('');
      // remove characters before last directory
      const jobsStart = String(reversedURL.split('/', 2));
      // reverse string back to normal
      const reverseBack = jobsStart.split('').reverse().join('');
      // remove characters after jobname
      const jobName = reverseBack.split(',', 1);
      return jobName;
    }
  }
});

Template.pic.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    EboyPix.update(this._id, {
      $set: { checked: !this.checked }
    });
  },
  'click .delete'() {
    EboyPix.remove(this._id);
  }
});
