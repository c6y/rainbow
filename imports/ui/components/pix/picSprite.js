import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

import { Colors } from '../../../api/colors/colors.js';

import './picSprite.html';

// Import functions
import { getFileType } from '../../../functions/both/getFileType.js';
import { scaleByIntToFit } from '../../../functions/client/scaleByIntToFit.js';
import { scaleSoft } from '../../../functions/client/scaleSoft.js';

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
    // Get dimensions from settings file
    const rem = Meteor.settings.public.dimensions.rem;
    const cell = Meteor.settings.public.dimensions.cell;
    // const cellMargin = Meteor.settings.public.dimensions.cellMargin;

    const thumbDim = rem * cell;
    // console.log('thumbDim: ' + thumbDim);

    // This image's original dimensions
    const oWidth = this.dimensions.width;
    const oHeight = this.dimensions.height;

    // Dimensions of thumbnail box
    const wWidth = thumbDim;
    const wHeight = thumbDim;

    // // Calculate areas of image, thumbnail box and difference
    // const areaImg = this.dimensions.width * this.dimensions.height;
    // // console.log('areaImg: ' + areaImg);
    // const areaThumbBox = thumbDim * thumbDim;
    // const areaDif = areaThumbBox - areaImg;
    // console.log('areaDif: ' + areaDif);
    //
    // // Define the two different border options
    // const borderDefault = rem * cellMargin;
    // // console.log('borderDefault: ' + borderDefault);
    // const borderOverlap = rem * cellMargin * -8;
    // // console.log('borderOverlap: ' + borderOverlap);
    //
    // // Calculate threshold that triggers overlap border
    // const areaDifThreshold = rem * cell * rem * cell / 4;
    // // console.log('areaDifThreshold: ' + areaDifThreshold);
    //
    // // images with similar area as thumbnail are allowed to overlap
    // const border = areaDif < areaDifThreshold ? borderOverlap : borderDefault;
    // // console.log('border: ' + border);
    //
    // const deviceRatio = window.devicePixelRatio;
    // const oWidth = this.dimensions.width / deviceRatio;
    // const oHeight = this.dimensions.height / deviceRatio;
    //
    // // const wWidth = thumbDim - 2 * border;
    // // const wHeight = thumbDim - 2 * border;
    // const wWidth = thumbDim;
    // const wHeight = thumbDim;

    const fileType = getFileType(this.name);
    // console.log('fileType: ' + fileType);

    let scaledDims;
    if (fileType === 'jpg') {
      scaledDims = scaleSoft(oWidth, oHeight, wWidth, wHeight);
      // scaledDims = scaleByIntToFit(oWidth, oHeight, wWidth, wHeight);
    } else {
      scaledDims = scaleByIntToFit(oWidth, oHeight, wWidth, wHeight, this.name);
    }

    return {
      width: scaledDims.width,
      height: scaledDims.height
    };
  }
});

Template.picSprite.events({
  // Remember location when leaving search page
  'click .picSpriteBox'(event) {
    const thisRoute = FlowRouter.getRouteName();
    const thisSlug = FlowRouter.getParam('slug');
    const thisPage = FlowRouter.getParam('page');
    const thisQuery = FlowRouter.getQueryParam('q');

    Session.set('lastRoute', thisRoute);
    Session.set('lastSlug', thisSlug);
    Session.set('lastPage', thisPage);
    Session.set('lastQuery', thisQuery);
  }
});
