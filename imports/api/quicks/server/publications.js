import { Meteor } from 'meteor/meteor';

import { Quicks } from '../quicks.js';

Meteor.publish('quicks.public', function quicksPublic() {
  const selector = {}; // find all
  return Quicks.find(selector);
});
