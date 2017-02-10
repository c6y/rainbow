// Meteor stuff
import { Template } from 'meteor/templating';

// Collections
import { EboyPix } from '../../api/eboypix/eboypix.js';

import './urlsPage.html';

// Template onCreated
Template.urlsPage.onCreated(function() {
  const self = this;
  const projectname = 'gfsub'; // //
  self.autorun(function() {
    self.subscribe('pix.urls.public', projectname);
  });
});

Template.urlsPage.helpers({
  gameFramePix() {
    const selector = {};
    const options = { sort: { createdAt: -1 } };
    return EboyPix.find(selector, options);
  }
});
