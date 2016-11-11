// import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { FlowRouter } from 'meteor/kadira:flow-router';
// import { ReactiveVar } from 'meteor/reactive-var';
// import { Session } from 'meteor/session';
// import { Tracker } from 'meteor/tracker';
// import { $ } from 'meteor/jquery';

import { Colors } from '../../api/colors/colors.js';

import './picSpriteZoom.html';

// Template.picSpriteZoom.onRendered(function() {
//   let width = document.getElementById('picSpriteBox').offsetWidth;
//   Session.set('width', width);
// });

// Template helpers
Template.picSpriteZoom.helpers({
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
  },
  scaledDims() {
    const width = this.dimensions.width;
    const height = this.dimensions.height;

    const boxDim = Math.max(window.innerHeight, window.innerWidth) - 200;
    const maxDim = Math.max(width, height);

    let divisor = boxDim / maxDim;
    if (divisor <= 0.5) {
      divisor = 0.5;
    } else {
      divisor = Math.max(Math.floor(divisor), 1);
    }
    // Return scaled dimensions
    const scaledWidth = width * divisor;
    const scaledHeight = height * divisor;
    return {
      width: scaledWidth,
      height: scaledHeight
    };
  }
});
