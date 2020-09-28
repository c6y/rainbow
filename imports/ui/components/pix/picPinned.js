// Meteor stuff
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

// Collections
import { EboyPix } from '../../../api/eboypix/eboypix.js';
import { Colors } from '../../../api/colors/colors.js';
import { CssBacks } from '../../../api/cssbacks/cssbacks.js';

// Functions
import { isHome } from '../../../functions/client/isHome.js';
import { hslColorString } from '../../../functions/client/hslColorString.js';

import './picPinned.html';

// Template onCreated
Template.picPinned.onCreated(function() {
  const self = this;
  if (isHome()) {
    self.autorun(function() {
      self.subscribe('pix.pinned.public');
    });
  }
});

// Template helpers
Template.picPinned.helpers({
  thisIsHome() {
    return isHome();
  },
  toSpriteBoxPath() {
    const pinnedPic = EboyPix.findOne({ projects: 'pinned' });
    if (pinnedPic) {
      const thisId = pinnedPic._id;
      const params = { _id: thisId };
      return FlowRouter.path('spriteBox', params);
    }
  },
  backPinned() {
    const pinnedBack = CssBacks.findOne({ name: 'pinned' });
    console.log('pinnedBack.name: ' + pinnedBack.name);
    return pinnedBack.code;
  },
  pinnedPic() {
    const pinnedPic = EboyPix.findOne({ projects: 'pinned' });
    return pinnedPic;
  },
  pinnedPicColor() {
    // Get the color by name
    const pinnedPic = EboyPix.findOne({ projects: 'pinned' });
    // Do this only when pinnedPic object exists
    if (pinnedPic) {
      const color = Colors.findOne(
          { name: pinnedPic.backgroundColor },
      );
      // If it's in the color database return hsl values as css hsl string
      if (color) {
        const hslColor = hslColorString(color);
        return hslColor;
      }
    }
  },
});

Template.picPinned.events({
  // Remember location when leaving search page
  'click #pinned'(event) {
    const thisRoute = FlowRouter.getRouteName();
    const thisSlug = FlowRouter.getParam('slug');
    const thisPage = FlowRouter.getParam('page');
    const thisQuery = FlowRouter.getQueryParam('q');

    Session.set('lastRoute', thisRoute);
    Session.set('lastSlug', thisSlug);
    Session.set('lastPage', thisPage);
    Session.set('lastQuery', thisQuery);
  },
});
