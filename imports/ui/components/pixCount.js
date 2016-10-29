import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './pixCount.html';

Template.pixCount.onCreated(function() {
  const self = this;
  self.autorun(function() {
    self.subscribe('pix.counts.public');
  });
});

Template.pixCount.helpers({
  pixCounter() {
    return Counts.get('totalDocsCount');
  }
});
