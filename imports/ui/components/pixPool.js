import { Template } from 'meteor/templating';

import { EboyPix } from '../../api/eboypix/eboypix.js';

// import './pixPool.html';

Template.pixPool.helpers({
  pix() {
    return EboyPix.find({}, { sort: { createdAt: -1 } });
  }
});
