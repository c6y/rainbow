import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './device.html';

Template.device.helpers({
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
Template.device.events({
  'click .deviceDelete'() {
    Meteor.call('device.delete', this._id);
  },
});
