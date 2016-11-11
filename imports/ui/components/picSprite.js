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
    // console.log('this.name: ' + this.name);
    const rem = Meteor.settings.public.rem;
    const cell = Meteor.settings.public.cell;
    const cellMargin = Meteor.settings.public.cellMargin;

    const thumbDim = rem * cell;

    // Calculate areas of image, thumbnail box and difference
    const areaImg = this.dimensions.width * this.dimensions.height;
    const areaThumbBox = thumbDim * thumbDim;
    const areaDif = areaThumbBox - areaImg;
    // console.log('areaDif: ' + areaDif);

    // Define the two different border options
    const borderDefault = rem * cellMargin;
    const borderOverlap = rem * cellMargin * -8;

    // Calculate threshold that triggers overlap border
    const areaDifThreshold = rem * cell * rem * cell / 4;
    // console.log('areaDifThreshold: ' + areaDifThreshold);

    // images with similar area as thumbnail are allowed to overlap
    const border = areaDif < areaDifThreshold ? borderOverlap : borderDefault;
    // console.log('border: ' + border);

    const deviceRatio = window.devicePixelRatio;
    const oWidth = this.dimensions.width / deviceRatio;
    const oHeight = this.dimensions.height / deviceRatio;

    const wWidth = thumbDim - 2 * border;
    const wHeight = thumbDim - 2 * border;

    const scaledDims = scaleByIntToFit(oWidth, oHeight, wWidth, wHeight);
    return {
      width: scaledDims.width,
      height: scaledDims.height
    };
  }
});
