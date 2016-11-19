import { Meteor } from 'meteor/meteor';

import { Colors } from '../colors.js';

import { ColorSchema } from '../schemas.js';
Colors.attachSchema(ColorSchema.HSLAColors);

Meteor.publish('colors.public', function colorsPublic() {
  const selector = {}; // find all
  return Colors.find(selector);
});
