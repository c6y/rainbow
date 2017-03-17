// Meteor stuff
import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './accessinfo.html';

Template.accessinfo.onCreated(function() {
  const self = this;
  self.autorun(function() {
    self.subscribe('pix.accesscounts.public');
  });
});

Template.accessinfo.helpers({
  accessPlusCounter() {
    return Counts.get('accessOneCount');
  }
});
