import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Colors } from '../../api/colors/colors.js';

import './pic.html';

// Database subscriptions
Meteor.subscribe('pix.public');
Meteor.subscribe('colors.public');

// Template helpers
Template.pic.helpers({
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
      'transparent 0.5em,' +
      '#ccc 0.5em,' +
      '#ccc 1em' +
      ')';
    return {
      info: 'Warning! Assign a color!',
      value: emptyColor
    };
  }
});
