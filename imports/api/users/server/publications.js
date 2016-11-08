import { Meteor } from 'meteor/meteor';

Meteor.publish('allUsers', function() {
  const selector = {}; // find all pix
  const collection = Meteor.users.find(selector);
  return collection;
});
