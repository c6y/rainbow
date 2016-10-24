import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Colors } from '../../api/colors/colors.js';

import './doc.html';

// Components used
import './pic.js';
import './pic.html';
import './metadata.js';
import './metadata.html';

Template.doc.helpers({
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
    const emptyColor = 'repeating-linear-gradient(' +
      '135deg,' +
      'transparent,' +
      'transparent 0.5rem,' +
      '#ccc 0.5rem,' +
      '#ccc 1rem' +
      ')';
    return {
      info: 'Warning! Assign a color!',
      value: emptyColor
    };
  }
});

// Template events
Template.doc.events({
  'click .deletePic'() {
    Meteor.call('eboypix.delete', this._id);
  }
});
