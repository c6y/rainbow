// Meteor stuff
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
    return Meteor.users.find({}, { sort: { profile: -1, createdAt: 1 } });
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
  userCreatedAt() {
    if (Meteor.user().createdAt) {
      const userDate = Meteor.user().createdAt;
      const shortDate = userDate.toISOString().substring(0, 10);
      return shortDate;
    }
  }
});

Template.dashboard.events({
  'click .logoutButton'(event) {
    event.preventDefault();
    Meteor.logout();
  },
  'click .removeUser'(event) {
    event.preventDefault();
    if (Meteor.user().profile.isAdmin) {
      if (confirm('Delete user: ' + this.username + ', ' + this.emails[0].address)) {
        console.log('removing user: ' + this.username);
        Meteor.call('users.delete', this._id);
      }
    }
  },
  'click .isUser'() {
    const userName = this.username;
    const thisState = this.profile.isUser;
    const thisNewState = thisState === false;
    const thisId = this._id;
    if (confirm('set User for ' + userName + ' to ' + thisNewState + '?')) {
      Meteor.call('toggleIsUser', thisId);
    }
  },
  'click .isEditor'() {
    const userName = this.username;
    const thisState = this.profile.isEditor;
    const thisNewState = thisState === false;
    const thisId = this._id;
    if (confirm('set Editor for ' + userName + ' to ' + thisNewState + '?')) {
      Meteor.call('toggleIsEditor', thisId);
    }
  },
  'click .isAdmin'() {
    const userName = this.username;
    const thisState = this.profile.isAdmin;
    const thisNewState = thisState === false;
    const thisId = this._id;
    if (confirm('set Admin for ' + userName + ' to ' + thisNewState + '?')) {
      Meteor.call('toggleIsAdmin', thisId);
    }
  }
});
