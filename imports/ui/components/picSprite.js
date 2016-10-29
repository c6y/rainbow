// import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Colors } from '../../api/colors/colors.js';

import './picSprite.html';

// Template helpers
Template.picSprite.helpers({
  toSpriteBoxPath() {
    const thisId = this._id;
    const params = { _id: thisId };
    return FlowRouter.path('spriteBox', params);
  },
  isNotSpriteBoxRoute() {
    const routeName = FlowRouter.getRouteName();
    // Returns true if we're not on spriteBox
    return routeName !== 'spriteBox';
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
    const boxDim = 256 + 16;
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
