import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './doc.html';
import './metadata.js';
import './metadata.html';

Meteor.subscribe('pix.public');
Meteor.subscribe('colors.public');

Template.pic.events({
  'click .deletePic'() {
    Meteor.call('eboypix.delete', this._id);
  }
});
