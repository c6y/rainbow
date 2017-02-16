import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

// import { Colors } from '../../../api/colors/colors.js';

import './user.html';

Template.user.helpers({
  user() {
    return Meteor.user().username;
  },
  toLoginPath() {
    return FlowRouter.path('dashboard');
  }
});

Template.user.events({
  'click #logoutButton'(event) {
    event.preventDefault();
    Meteor.logout();
  }
});
