import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { EboyPix } from '../../api/eboypix/eboypix.js';

// Components used
import './pixList.html';
import './pixList.js';

// Template helpers
Template.pixPoolLatest.helpers({
  pix() {
    return EboyPix.find({}, { sort: { createdAt: -1 } });
  },
  docsCount() {
    const newDocsCount = EboyPix.find().count();
    return newDocsCount;
  },
  latestUploadTime() {
    return Session.get('latestUploadAt');
  }
});
