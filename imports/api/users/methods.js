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
    const allowNewAdmins = Meteor.settings.public.allowNewAdmins;
    const allowNewEditors = Meteor.settings.public.allowNewEditors;
    const allowNewUsers = Meteor.settings.public.allowNewUsers;

    const defaultRoles = {
      isAdmin: allowNewAdmins,
      isEditor: allowNewEditors
    };
    if (allowNewUsers) {
      Accounts.createUser({
        username: newUsername,
        email: newEmail,
        password: newPassword,
        profile: defaultRoles
      });
    }
    console.log(newUsername + ': new User');
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
