import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './color.html';

Meteor.subscribe('colors.public');

Template.color.events({
  'click .removeColor'() {
    Meteor.call('color.delete', this._id);
  }
});
