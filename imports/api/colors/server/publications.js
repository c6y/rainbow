// Meteor stuff
import { Meteor } from 'meteor/meteor';

// Collections
import { Colors } from '../colors.js';

// Schemas
import { ColorSchema } from '../schemas.js';

Colors.attachSchema(ColorSchema.HSLAColors);

Meteor.publish('colors.public', function colorsPublic() {
  const selector = {}; // find all
  return Colors.find(selector);
});
