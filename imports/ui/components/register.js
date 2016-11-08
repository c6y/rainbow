import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

import './register.html';

Template.register.events({
  'submit form'(event) {
    event.preventDefault();
    const newUsername = event.target.registerUsername.value;
    const newEmail = event.target.registerEmail.value;
    const newPassword = event.target.registerPassword.value;
    Accounts.createUser({
      username: newUsername,
      email: newEmail,
      password: newPassword
    });
  }
});
