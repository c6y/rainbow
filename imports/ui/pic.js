import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Colors } from '../api/colors/colors.js';
import './pic.html';

// import { EboyPix } from '../api/eboypix/eboypix.js';
// import { Colors } from '../api/colors/colors.js';

Template.pic.helpers({
  // Truncate the URL and return file name only
  picName() {
    const url = this.url;
    return url.substring(url.lastIndexOf("/") + 1, url.length);
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
  colorHSL() {
    // Get the color by name
    const color = Colors.findOne(
      { name: this.backgroundColor }
    );
    // If it's in the color database return hsl values as css hsl string
    if (color) {
      const hslColor = String(
        'hsl(' +
        color.hue + ', ' +
        color.saturation + '%, ' +
        color.luminosity + '%)'
      );
      return {
        info: hslColor,
        value: hslColor
      };
    }
    // If color does not exist return diagonal stripes warning pattern
    const emptyColor = 'repeating-linear-gradient(135deg, transparent, transparent 0.5em, #ccc 0.5em, #ccc 1em);'
    return {
      info: 'Warning! Assign a color!',
      value: emptyColor
    };
  }
});

Template.pic.events({
  'click .delete'() {
    Meteor.call('eboypix.delete', this._id);
  }
});
