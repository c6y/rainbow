import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './cssBack.html';

Template.cssBack.helpers({
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
Template.cssBack.events({
  'click .deleteCssBack'() {
    Meteor.call('cssback.delete', this._id);
  },
});
