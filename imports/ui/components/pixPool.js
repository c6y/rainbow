import { Template } from 'meteor/templating';

import { EboyPix } from '../../api/eboypix/eboypix.js';

import './pixPool.html';

// Components used
import './pic.html';
import './pic.js';

// Template helpers
Template.pixPool.helpers({
  pix() {
    return EboyPix.find({}, { sort: { createdAt: -1 } });
  }
});
