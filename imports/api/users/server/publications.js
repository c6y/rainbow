// Meteor stuff
import { Meteor } from 'meteor/meteor';

// Schemas
import { UserSchema } from '../schemas.js';

Meteor.users.attachSchema(UserSchema.User);

Meteor.publish('allUsers', function() {
  const query = {}; // find all pix
  const projection = {};
  const collection = Meteor.users.find(query, projection);
  return collection;
});
