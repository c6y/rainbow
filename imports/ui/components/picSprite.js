import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Colors } from '../../api/colors/colors.js';

import './picSprite.html';

// Import functions
import { scaleByIntToFit } from '../../functions/client/scaleByIntToFit.js';

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
    const rem = Meteor.settings.public.rem;
    const cell = Meteor.settings.public.cell;
    const cellMargin = Meteor.settings.public.cellMargin;
    console.log('cellMargin: ' + cellMargin);

    const thumbDim = rem * cell;
    const border = rem * cellMargin;

    const deviceRatio = window.devicePixelRatio;
    const oWidth = this.dimensions.width / deviceRatio;
    const oHeight = this.dimensions.height / deviceRatio;
    console.log('Image:  oWidth x oHeight: ' + oWidth + 'x' + oHeight);

    const wWidth = thumbDim - 2 * border;
    const wHeight = thumbDim - 2 * border;
    console.log('Window: wWidth x wHeight: ' + wWidth + 'x' + wHeight);

    const scaledDims = scaleByIntToFit(oWidth, oHeight, wWidth, wHeight);
    console.log('scaledDims.factor: ' + scaledDims.factor);
    return {
      width: scaledDims.width,
      height: scaledDims.height
    };
  }
});
