import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

import './dashboard.html';

// Template onCreated
Template.dashboard.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const title = FlowRouter.getRouteName();
    DocHead.setTitle(title);
    self.subscribe('allUsers');
  });
});

Template.dashboard.helpers({
  userEmail() {
    const userEmail = Meteor.user().emails[0];
    return userEmail.address;
  },
  userId() {
    return Meteor.userId();
  },
  users() {
    return Meteor.users.find({});
  },
  email() {
    return this.emails[0].address;
  }
});

Template.dashboard.events({
  'click .logout'(event) {
    event.preventDefault();
    Meteor.logout();
  }
});
