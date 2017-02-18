// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// Functions
import { isAdmin } from '../../functions/server/isUser.js';

Meteor.methods({
  'users.delete'(userId) {
    if (isAdmin()) {
      Meteor.users.remove(userId);
      console.log(userId + ': removed from users');
    }
  },
  'users.insert'(newUsername, newEmail, newPassword) {
    // Set permissions to create user accounts in settings.json
    const allowNewUsers = Meteor.settings.public.userSetup.allowNewUsers;
    if (allowNewUsers) {
      const defaultRoles = {
        isAdmin: Meteor.settings.public.userSetup.defaultIsAdmin,
        isEditor: Meteor.settings.public.userSetup.defaultIsEditor,
        isUser: Meteor.settings.public.userSetup.defaultIsUser
      };
      if (allowNewUsers) {
        Accounts.createUser({
          username: newUsername,
          email: newEmail,
          password: newPassword,
          profile: defaultRoles
        });
      }
      console.log(newUsername + ', ' + newEmail + ': new User');
    } else {
      throw new Meteor.Error('no new Users allowed');
    }
  },
  toggleIsUser(thisId) {
    if (isAdmin()) {
      const oldUser = Meteor.users.findOne(thisId);
      const oldState = oldUser.profile.isUser;
      const newState = oldState === false;
      Meteor.users.update(
        thisId,
        { $set: { 'profile.isUser': newState } }
      );
      console.log(oldUser.username + ': isUser: ' + newState);
    }
  },
  toggleIsEditor(thisId) {
    if (isAdmin()) {
      const oldUser = Meteor.users.findOne(thisId);
      const oldState = oldUser.profile.isEditor;
      const newState = oldState === false;
      Meteor.users.update(
        thisId,
        { $set: { 'profile.isEditor': newState } }
      );
      console.log(oldUser.username + ': isEditor: ' + newState);
    }
  },
  toggleIsAdmin(thisId) {
    if (isAdmin()) {
      const oldUser = Meteor.users.findOne(thisId);
      const oldState = oldUser.profile.isAdmin;
      const newState = oldState === false;
      Meteor.users.update(
        thisId,
        { $set: { 'profile.isAdmin': newState } }
      );
      console.log(oldUser.username + ': isAdmin: ' + newState);
    }
  }
});
