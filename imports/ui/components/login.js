// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { GAnalytics } from 'meteor/datariot:ganalytics';

import './login.html';

Template.login.events({
  'submit form'(event) {
    event.preventDefault();
    const userEmail = event.target.loginEmail.value;
    const userPassword = event.target.loginPassword.value;
    GAnalytics.event('users', 'login', userEmail);
    Meteor.loginWithPassword(userEmail, userPassword);
  }
});
