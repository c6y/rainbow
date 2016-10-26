import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { EboyPix } from '../../api/eboypix/eboypix.js';

// Components used
import './doc.html';
import './doc.js';

// Template helpers
Template.pixPoolLatest.helpers({
  docs() {
    return EboyPix.find({}, { sort: { createdAt: -1 } });
  },
  docsCount() {
    const newDocsCount = EboyPix.find().count();
    console.log('newDocsCount: ' + newDocsCount);
    return newDocsCount;
  },
  latestUploadTime() {
    return Session.get('latestUploadAt');
  }
});
