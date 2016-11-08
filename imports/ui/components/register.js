import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { Accounts } from 'meteor/accounts-base';

import './register.html';

// Template.register.events({
//   'submit form'(event) {
//     event.preventDefault();
//     const newUsername = event.target.registerUsername.value;
//     const newEmail = event.target.registerEmail.value;
//     const newPassword = event.target.registerPassword.value;
//     const defaultRoles = { isAdmin: true, isEditor: true };
//     Meteor.call('users.insert', newUsername, newEmail, newPassword, defaultRoles);
//   }
// });

Template.register.events({
  'submit form'(event) {
    event.preventDefault();
    const newUsername = event.target.registerUsername.value;
    const newEmail = event.target.registerEmail.value;
    const newPassword = event.target.registerPassword.value;
    Meteor.call('users.insert', newUsername, newEmail, newPassword);
    Meteor.loginWithPassword(newUsername, newPassword);
    // Accounts.createUser({
    //   username: newUsername,
    //   email: newEmail,
    //   password: newPassword,
    //   profile: defaultRoles
    // });
  }
});
