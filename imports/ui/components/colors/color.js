import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './color.html';

// Template events
Template.color.events({
  'click .deleteColor'() {
    Meteor.call('color.delete', this._id);
  }
});
