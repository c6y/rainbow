import { Meteor } from 'meteor/meteor';

import { Quicks } from './quicks.js';

// Import functions
// import { cleanString } from '../../functions/server/cleanString.js';
// import { tagsToArray } from '../../functions/server/tagsToArray.js';

Meteor.methods({
  'quicks.insert'(name, slug, query) {
    Quicks.insert({
      name: name,
      slug: slug,
      query: query
    });
  },
  'quicks.deleteAll'() {
    Quicks.remove({});
  },
  'quicks.delete'(id) {
    Quicks.remove(id);
  }
});
