import { Template } from 'meteor/templating';

import { EboyPix } from '../../api/eboypix/eboypix.js';

// Components used
import './doc.html';
import './doc.js';

// Template helpers
Template.pixPool.helpers({
  docs() {
    return EboyPix.find({}, { sort: { createdAt: -1 } });
  }
});
