// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'users.delete'(userId) {
    const isAdmin = Meteor.user().profile.isAdmin;
    if (isAdmin) {
      Meteor.users.remove(userId);
    }
  },
  'users.insert'(newUsername, newEmail, newPassword) {
    // Set permissions to create user accounts in settings.json
    const allowNewAdmins = Meteor.settings.public.allowNewAdmins;
    const allowNewEditors = Meteor.settings.public.allowNewEditors;
    const allowNewUsers = Meteor.settings.public.allowNewUsers;

    const defaultRoles = { isAdmin: allowNewAdmins, isEditor: allowNewEditors };
    if (allowNewUsers) {
      Accounts.createUser({
        username: newUsername,
        email: newEmail,
        password: newPassword,
        profile: defaultRoles
      });
    }
  },
  toggleIsEditor(thisId) {
    // only if current User is admin
    const isAdmin = Meteor.user().profile.isAdmin;
    if (isAdmin) {
      const oldUser = Meteor.users.findOne(thisId);
      const oldState = oldUser.profile.isEditor;
      const newState = oldState === false;
      Meteor.users.update(
        thisId,
        { $set: { 'profile.isEditor': newState } }
      );
    }
  },
  toggleIsAdmin(thisId) {
    // only if current User is admin
    const isAdmin = Meteor.user().profile.isAdmin;
    if (isAdmin) {
      const oldUser = Meteor.users.findOne(thisId);
      const oldState = oldUser.profile.isAdmin;
      const newState = oldState === false;
      Meteor.users.update(
        thisId,
        { $set: { 'profile.isAdmin': newState } }
      );
    }
  }
});
