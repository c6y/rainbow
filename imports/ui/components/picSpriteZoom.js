import { Template } from 'meteor/templating';

import { Colors } from '../../api/colors/colors.js';

import './picSpriteZoom.html';

// Import functions
import { scaleByIntToFit } from '../../functions/client/scaleByIntToFit.js';

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
    const deviceRatio = window.devicePixelRatio;
    const oWidth = this.dimensions.width / deviceRatio;
    const oHeight = this.dimensions.height / deviceRatio;

    const wWidth = window.innerWidth;
    const wHeight = window.innerHeight;

    const boxWidth = wWidth - 128;
    const boxHeight = wHeight - 128;

    const scaled = scaleByIntToFit(oWidth, oHeight, boxWidth, boxHeight);
    return {
      width: scaled.width,
      height: scaled.height
    };
  }
});
