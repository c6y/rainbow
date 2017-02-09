// Meteor stuff
import { Template } from 'meteor/templating';

// Collections
import { EboyPix } from '../../api/eboypix/eboypix.js';

import './gameFramePage.html';

// Template onCreated
Template.gameFramePage.onCreated(function() {
  const self = this;
  self.autorun(function() {
    self.subscribe('pix.gameFrame.public');
  });
});

Template.gameFramePage.helpers({
  gameFramePix() {
    const selector = {};
    const options = { sort: { createdAt: -1 } };
    return EboyPix.find(selector, options);
  }
});
