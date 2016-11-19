import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// Functions
import { getQuickUrl } from '../../../functions/client/getQuickUrl.js';

import './quick.html';

Template.quick.helpers({
  quickUrl() {
    return getQuickUrl(this.slug, this.query);
  },
  isAdminOrEditor() {
    if (Meteor.user()) {
      const isAdmin = Meteor.user().profile.isAdmin;
      const isEditor = Meteor.user().profile.isEditor;
      return isAdmin || isEditor;
    }
    return false;
  }
});

// Template events
Template.quick.events({
  'click .quickDelete'() {
    Meteor.call('quick.delete', this._id);
  }
});
