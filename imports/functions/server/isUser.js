import { Meteor } from 'meteor/meteor';

/**
 * checks if user is Admin or Editor
 * @return {boolean} true or false
 */
export function isAdminOrEditor() {
  const isAdmin = Meteor.user().profile.isAdmin;
  const isEditor = Meteor.user().profile.isEditor;
  // if user is neither Admin or Editor throw an error
  if (!isAdmin && !isEditor) {
    throw new Meteor.Error('not-authorized');
  }
  return true;
}

/**
 * checks if user is Admin
 * @return {boolean} true or false
 */
export function isAdmin() {
  const isAdmin = Meteor.user().profile.isAdmin;
  // if user is not an Admin
  if (!isAdmin) {
    throw new Meteor.Error('not-authorized');
  }
  return true;
}
