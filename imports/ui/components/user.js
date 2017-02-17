// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { GAnalytics } from 'meteor/datariot:ganalytics';

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
    const userEmail = Meteor.user().emails[0].address;
    GAnalytics.event('users', 'logout', userEmail);
    Meteor.logout();
  }
});
