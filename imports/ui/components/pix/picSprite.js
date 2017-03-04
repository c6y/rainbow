// Meteor stuff
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

    const thumbDim = rem * cell;
    // console.log('thumbDim: ' + thumbDim);

    // This image's original dimensions
    const oWidth = this.dimensions.width;
    const oHeight = this.dimensions.height;

    // Dimensions of thumbnail box
    let boxW = thumbDim;
    let boxH = thumbDim;

    const fileType = getFileType(this.name);
    // console.log('fileType: ' + fileType);

    let scaledDims;
    if (fileType === 'jpg') {
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
  renderJPGcss() {
    const fileType = getFileType(this.name);
    if (fileType === 'jpg') {
      return 'image-rendering:auto';
    }
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
