import { Meteor } from 'meteor/meteor';

import { Quicks } from './quicks.js';

// Import functions
// import { cleanString } from '../../functions/server/cleanString.js';
// import { tagsToArray } from '../../functions/server/tagsToArray.js';

Meteor.methods({
  'quicks.insert'(label, slug, query, rank) {
    Quicks.insert({
      label: label,
      slug: slug,
      query: query,
      rank: rank
    });
  },
  'quicks.deleteAll'() {
    Quicks.remove({});
  },
  'quick.delete'(id) {
    Quicks.remove(id);
  }
});
