// Meteor stuff
import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './pixCount.html';

Template.pixCount.helpers({
  pixCounter() {
    return Math.max(0, Counts.get('totalDocsCount'));
  },
});
