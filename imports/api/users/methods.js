import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'users.delete'(userId) {
    Meteor.users.remove(userId);
  }
});
