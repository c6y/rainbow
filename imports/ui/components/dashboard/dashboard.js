// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { GAnalytics } from 'meteor/datariot:ganalytics';

import './dashboard.html';

// Template onCreated
Template.dashboard.onCreated(function() {
  const self = this;
  self.autorun(function() {
    self.subscribe('allUsers');
  });
});

Template.dashboard.helpers({
  // Profile of user logged in
  username() {
    return Meteor.user().username;
  },
  userEmail() {
    const userEmail = Meteor.user().emails[0];
    return userEmail.address;
  },
  userId() {
    return Meteor.userId();
  },
  // Profiles of registered users
  registeredUsersCount() {
    return Meteor.users.find().count();
  },
  registeredUsers() {
    return Meteor.users.find({}, { sort: { profile: -1, createdAt: 1 } });
  },
  registeredUsersEmail() {
    return this.emails[0].address;
  },
  registeredUsersCreatedAtIso() {
    if (this.createdAt) {
      const userDate = this.createdAt;
      const shortDate = userDate.toISOString().substring(0, 10);
      return shortDate;
    }
  },
});

Template.dashboard.events({
  'click .logoutButton'(event) {
    event.preventDefault();
    const userEmail = Meteor.user().emails[0].address;
    GAnalytics.event('users', 'logout', userEmail);
    Meteor.logout();
  },
  'click .removeUser'(event) {
    event.preventDefault();
    if (Meteor.user().profile.isAdmin) {
      if (confirm('Delete user: ' +
        this.username +
        ', ' +
        this.emails[0].address)) {
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
  },
});
