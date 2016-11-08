import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './login.html';

Template.login.events({
  'submit form'(event) {
    event.preventDefault();
    const userEmail = event.target.loginEmail.value;
    const userPassword = event.target.loginPassword.value;
    Meteor.loginWithPassword(userEmail, userPassword);
  }
});
