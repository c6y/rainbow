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
    return Meteor.users.find({}, { sort: { username: 1 } });
  },
  email() {
    return this.emails[0].address;
  },
  username() {
    return Meteor.user().username;
  },
  usersCount() {
    return Meteor.users.find().count();
  },
  userIsEditor() {
    const isEditor = Meteor.user().profile.isEditor;
    return isEditor ? 'true' : 'false';
  }
});

Template.dashboard.events({
  'click .logout'(event) {
    event.preventDefault();
    Meteor.logout();
  },
  'click .removeUser'(event) {
    event.preventDefault();
    if (Meteor.user().profile.isAdmin) {
      if (confirm('Delete Document: ' + this._id)) {
        const userId = this._id;
        console.log('removing userId: ' + userId);
        Meteor.call('users.delete', this._id);
      }
    }
  },
  'click .isEditor'() {
    const thisUsername = this.username;
    const thisState = this.profile.isEditor;
    const thisNewState = thisState === false;
    const thisId = this._id;
    if (confirm('set Editor for ' + thisUsername + ' to ' + thisNewState + '?')) {
      Meteor.call('toggleIsEditor', thisId);
    }
  },
  'click .isAdmin'() {
    const thisUsername = this.username;
    const thisState = this.profile.isAdmin;
    const thisNewState = thisState === false;
    const thisId = this._id;
    if (confirm('set Admin for ' + thisUsername + ' to ' + thisNewState + '?')) {
      Meteor.call('toggleIsAdmin', thisId);
    }
  }
});
