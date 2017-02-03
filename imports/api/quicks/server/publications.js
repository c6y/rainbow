// Meteor stuff
import { Meteor } from 'meteor/meteor';

// Collections
import { Quicks } from '../quicks.js';

// Schemas
import { QuicksSchema } from '../schemas.js';

Quicks.attachSchema(QuicksSchema.Links);

Meteor.publish('quicks.public', function quicksPublic() {
  const selector = {}; // find all
  return Quicks.find(selector);
});
