// Meteor stuff
import { Meteor } from 'meteor/meteor';

// Collections
import { CssBacks } from '../cssbacks.js';

// Schemas
import { CssBackSchema } from '../schemas.js';

CssBacks.attachSchema(CssBackSchema.CssCode);

Meteor.publish('cssbacks.public', function cssBacksPublic() {
  const selector = {}; // find all
  return CssBacks.find(selector);
});
