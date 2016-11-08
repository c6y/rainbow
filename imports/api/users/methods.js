import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'users.delete'(userId) {
    Meteor.users.remove(userId);
  },
  'users.insert'(newUsername, newEmail, newPassword) {
    const defaultRoles = { isAdmin: true, isEditor: true };
    Accounts.createUser({
      username: newUsername,
      email: newEmail,
      password: newPassword,
      profile: defaultRoles
    });
  }
  // 'users.insert'(newUserName, newUserEmail, newUserPassword, newUserRoles) {
  //   let newUser = Accounts.createUser({
  //     username: newUserName,
  //     email: newUserEmail,
  //     password: newUserPassword
  //   });
    // Accounts.onCreateUser(function(newUser, user) {
    //   user.test = 'this is a test';
    //   return user;
    // });
    // Accounts.createUser({
    //   username: newUserName,
    //   email: newUserEmail,
    //   password: newUserPassword,
    //   roles: 'ROLESTEST'
    // });
    // Meteor.users.insert({
    //   username: newUserEmail,
    //   emails: emailsArray,
    //   password: newUserPassword
    // });
  // }
});
