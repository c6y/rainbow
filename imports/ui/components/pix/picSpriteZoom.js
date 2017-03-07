// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Colors } from '../../../api/colors/colors.js';

import './picSpriteZoom.html';

// Import functions
import { scaleByIntToFit } from '../../../functions/client/scaleByIntToFit.js';
import { scaleSoft } from '../../../functions/client/scaleSoft.js';
import { getFileType } from '../../../functions/both/getFileType.js';

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
    const oWidth = this.dimensions.width;
    const oHeight = this.dimensions.height;

    const wWidth = window.innerWidth;
    const wHeight = window.innerHeight;

    // add a little bit of padding
    const rem = Meteor.settings.public.dimensions.rem;
    let boxW = wWidth - rem * 2;
    let boxH = wHeight - rem * 2;

    // const fileType = getFileType(this.name);
    // console.log('fileType: ' + fileType);

    const antiAlias = this.antiAlias === true;

    let scaledDims;
    if (antiAlias) {
      scaledDims = scaleSoft(oWidth, oHeight, boxW, boxH);
      // scaledDims = scaleByIntToFit(oWidth, oHeight, boxW, boxH);
    } else {
      // Set padding to 1 rem
      const padding = Meteor.settings.public.dimensions.rem;
      boxW -= padding;
      boxH -= padding;
      scaledDims = scaleByIntToFit(oWidth, oHeight, boxW, boxH, this.name);
    }
    return {
      width: scaledDims.width,
      height: scaledDims.height
    };
  },
  isJPG() {
    const fileType = getFileType(this.name);
    if (fileType === 'jpg') {
      return true;
    }
  },
  antiAliasCSS() {
    const antiAlias = this.antiAlias;
    return antiAlias === true ? 'image-rendering:auto' : false;
  }
});
