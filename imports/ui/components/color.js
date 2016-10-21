import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './color.html';

// Database subscriptions
Meteor.subscribe('colors.public');

// Template events
Template.color.events({
  'click .removeColor'() {
    Meteor.call('color.delete', this._id);
  }
});
