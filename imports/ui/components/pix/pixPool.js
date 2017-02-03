// Meteor stuff
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
    // ... except if we're on the homepage
    // ... then remove the pinned posts from the results
    if (isHome()) {
      selector = { projects: { $ne: 'pinned' } };
    }

    return EboyPix.find(selector, { sort: { createdAt: -1 } });
  }
});
