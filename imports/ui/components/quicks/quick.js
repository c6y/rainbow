import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './quick.html';

// Template events
Template.quick.events({
  'click .deleteQuick'() {
    Meteor.call('quick.delete', this._id);
  }
});
