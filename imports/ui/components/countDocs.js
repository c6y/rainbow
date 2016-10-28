import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './countDocs.html';

Template.countDocs.onCreated(function() {
  const self = this;
  self.autorun(function() {
    self.subscribe('pix.counts.public');
  });
});

Template.countDocs.helpers({
  pixCounter() {
    return Counts.get('totalDocsCount');
  }
});
