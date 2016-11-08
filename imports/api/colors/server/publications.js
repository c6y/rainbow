import { Meteor } from 'meteor/meteor';

import { Colors } from '../colors.js';

Meteor.publish('colors.public', function colorsPublic() {
  const selector = {}; // find all
  return Colors.find(selector);
});
