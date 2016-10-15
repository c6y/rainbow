import { Template } from 'meteor/templating';

import { EboyPix } from '../../api/eboypix/eboypix.js';

Template.pixPool.helpers({
  pix() {
    return EboyPix.find({}, { sort: { createdAt: -1 } });
  }
});
