import { Meteor } from 'meteor/meteor';

import { Quicks } from '../quicks.js';

import { QuicksSchema } from '../schemas.js';
Quicks.attachSchema(QuicksSchema.Links);

Meteor.publish('quicks.public', function quicksPublic() {
  const selector = {}; // find all
  return Quicks.find(selector);
});
