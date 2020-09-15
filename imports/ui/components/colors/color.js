import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './color.html';

Template.color.helpers({
  isAdminOrEditor() {
    if (Meteor.user()) {
      const isAdmin = Meteor.user().profile.isAdmin;
      const isEditor = Meteor.user().profile.isEditor;
      return isAdmin || isEditor;
    }
    return false;
  },
});

// Template events
Template.color.events({
  'click .deleteColor'() {
    Meteor.call('color.delete', this._id);
  },
});
