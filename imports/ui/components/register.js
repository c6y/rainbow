import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

import './register.html';

Template.register.events({
  'submit form'(event) {
    event.preventDefault();
    const newEmail = event.target.registerEmail.value;
    const newPassword = event.target.registerPassword.value;
    Accounts.createUser({
      email: newEmail,
      password: newPassword
    });
  }
});
