import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { EboyPix } from '../../../api/eboypix/eboypix.js';
import { Colors } from '../../../api/colors/colors.js';

import './picPinned.html';

// Template helpers
Template.picPinned.helpers({
  showPinned() {
    const isPool = FlowRouter.getRouteName() === 'pool';
    const isPageOne = FlowRouter.getParam('page') === '1';
    const isSlugShowfoo = FlowRouter.getParam('slug') === 'showfoo';
    const query = FlowRouter.getQueryParam('q');
    let hasNoQuery = false;
    if (query === undefined) {
      hasNoQuery = true;
    }
    if (isPool && isPageOne && isSlugShowfoo && hasNoQuery) {
      return true;
    }
  },
  pinnedPic() {
    const pinnedPic = EboyPix.findOne({ projects: 'pinned' });
    return pinnedPic;
  },
  pinnedPicColor() {
    // Get the color by name
    const pinnedPic = EboyPix.findOne({ projects: 'pinned' });
    const color = Colors.findOne(
      { name: pinnedPic.backgroundColor }
    );
    // If it's in the color database return hsl values as css hsl string
    if (color) {
      const hslColor = String(
        'hsl(' +
        color.hue + ', ' +
        color.saturation + '%, ' +
        color.luminosity + '%)'
      );
      return hslColor;
    }
  }
});
