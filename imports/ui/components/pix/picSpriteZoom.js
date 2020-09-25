// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';

// Collections
import { Colors } from '../../../api/colors/colors.js';
import { CssBacks } from '../../../api/cssbacks/cssbacks.js';

// Functions
import { hslColorString } from '../../../functions/client/hslColorString.js';

import './picSpriteZoom.html';

// Import functions
import { scaleByIntToFit } from '../../../functions/client/scaleByIntToFit.js';
import { scaleSoftDown } from '../../../functions/client/scaleSoftDown.js';
import { scaleSoft } from '../../../functions/client/scaleSoft.js';
import { getFileType } from '../../../functions/both/getFileType.js';

// Template rendered/destroyed
// style hack fills hidden part of window with background color
Template.picSpriteZoom.rendered = function() {
  $('body').addClass('spriteBoxBody');
};
Template.picSpriteZoom.destroyed = function() {
  $('body').removeClass('spriteBoxBody');
};

// Template helpers
Template.picSpriteZoom.helpers({
  colorHSL() {
    if (this.backgroundPattern) {
      const selector = { name: this.backgroundPattern };
      console.log('this document references to ' + this.backgroundPattern);

      const cssBack = CssBacks.findOne(selector);

      if (cssBack) {
        console.log('cssBack.code: ' + cssBack.code);
        console.log('pattern found!');
        return {
          value: cssBack.code,
        };
      } else {
        console.log(
            'missing background pattern: \'' +
            this.backgroundPattern + '\' for ' + this.name,
        );
        // If background pattern does not exist return debug color
        return {
          value: 'background-color: ' + Meteor.settings.public.colors.debug,
        };
      }
    } else {
      // Get the color by name
      const color = Colors.findOne(
          { name: this.backgroundColor },
      );
      // If it's in the color database return hsl values as css hsl string
      if (color) {
        const hslColor = hslColorString(color);
        return {
          info: hslColor,
          value: 'background-color: ' + hslColor,
        };
      } else {
        // If color does not exist return debug color
        console.log('this.backgroundColor: ' + this.backgroundColor);
        return {
          info: 'Warning! Assign a color!',
          value: 'background-color: ' + Meteor.settings.public.colors.debug,
        };
      }
    }
  },
  scaledDims() {
    const oWidth = this.dimensions.width;
    const oHeight = this.dimensions.height;

    const wWidth = window.innerWidth;
    const wHeight = window.innerHeight;

    // add a little bit of padding
    const rem = Meteor.settings.public.dimensions.rem;
    const boxW = wWidth - rem * 2;
    const boxH = wHeight - rem * 2;

    const fileType = getFileType(this.name);
    const antiAlias = this.antiAlias;
    let scaledDims;

    // Scale differently, depending on file type
    // SVGs will scale up and down softly
    // documents where 'antiAlias' is true will scale down softly
    // all other documents will be scaled by integer
    if (fileType === 'svg') {
      scaledDims = scaleSoft(oWidth, oHeight, boxW, boxH);
    } else if (antiAlias) {
      scaledDims = scaleSoftDown(oWidth, oHeight, boxW, boxH);
    } else {
      scaledDims = scaleByIntToFit(oWidth, oHeight, boxW, boxH);
    }

    return {
      width: scaledDims.width,
      height: scaledDims.height,
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
  },
});

Template.picSpriteZoom.events({
  // Go back to the originating search page
  'click img'() {
    let lastRoute = Session.get('lastRoute');
    let lastSlug = Session.get('lastSlug');
    let lastPage = Session.get('lastPage');
    const lastQuery = Session.get('lastQuery');

    if (lastRoute === undefined) {
      lastRoute = 'pool';
    }
    lastRoute = lastRoute === undefined ? 'pool' : lastRoute;
    lastSlug = lastSlug === undefined ? 'everything' : lastSlug;
    lastPage = lastPage === undefined ? 1 : lastPage;

    FlowRouter.go(
        lastRoute,
        {
          slug: lastSlug,
          page: lastPage,
        },
        {
          q: lastQuery,
        },
    );
  },
});
