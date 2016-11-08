import { Meteor } from 'meteor/meteor';

Meteor.publish('allUsers', function() {
  const query = {}; // find all pix
  const projection = {};
  const collection = Meteor.users.find(query, projection);
  return collection;
});
