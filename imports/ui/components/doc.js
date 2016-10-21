import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './doc.html';

// Components used
import './pic.js';
import './pic.html';
import './metadata.js';
import './metadata.html';

// Template events
Template.doc.events({
  'click .deletePic'() {
    Meteor.call('eboypix.delete', this._id);
  }
});
