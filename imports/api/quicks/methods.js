// Meteor stuff
import { Meteor } from 'meteor/meteor';

// Collections
import { Quicks } from './quicks.js';

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
