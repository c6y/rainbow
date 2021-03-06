// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { GAnalytics } from 'meteor/datariot:ganalytics';

import './register.html';

Template.register.events({
  'submit form'(event) {
    event.preventDefault();
    const target = event.target;
    const newUsername = target.registerUsername.value;
    const newEmail = target.registerEmail.value;
    const newPassword = target.registerPassword.value;
    Meteor.call('users.insert', newUsername, newEmail, newPassword);
    GAnalytics.event('users', 'register', newEmail);
    if (!Meteor.user().profile.isAdmin) {
      Meteor.loginWithPassword(newUsername, newPassword);
    }
    target.registerUsername.value = '';
    target.registerEmail.value = '';
    target.registerPassword.value = '';
  },
});
