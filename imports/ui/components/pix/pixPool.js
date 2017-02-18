// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// Collections
import { EboyPix } from '../../../api/eboypix/eboypix.js';

// Functions
import { isHome } from '../../../functions/client/isHome.js';

// Components
import './pic.html';
import './pic.js';
import './picPinned.html';
import './picPinned.js';

import './pixPool.html';

// Template helpers
Template.pixPool.helpers({
  pix() {
    // Show all posts ...
    let selector = {};

    // Sort by newest on top
    let options = { sort: { createdAt: -1 } };

    // To keep out the pinned post in case it is not part of page 1:
    // If on home, do crop off anything older than the latest 24 posts
    // Necessary, because the pinned post will pop up as the 25th post ...
    // ... if part of any page other than page 1
    // See forum post: https://goo.gl/VDwXBg
    const pixPerPage = Meteor.settings.public.navigation.pixPerPage;
    if (isHome()) {
      options = {
        limit: pixPerPage,
        sort: { createdAt: -1 }
      };
    }

    return EboyPix.find(selector, options);
  }
});
