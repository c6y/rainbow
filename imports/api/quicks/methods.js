// Meteor stuff
import { Meteor } from 'meteor/meteor';

// Collections
import { Quicks } from './quicks.js';

// Functions
import { isAdminOrEditor, isAdmin } from '../../functions/server/isUser.js';

Meteor.methods({
  'quicks.insert'(label, slug, query, rank) {
    if (isAdminOrEditor()) {
      Quicks.insert({
        label: label,
        slug: slug,
        query: query,
        rank: rank
      });
      console.log(label + ': inserted to Quicks');
    }
  },
  'quicks.deleteAll'() {
    if (isAdmin()) {
      Quicks.remove({});
      console.log('removed all documents from Quicks');
    }
  },
  'quick.delete'(id) {
    if (isAdminOrEditor()) {
      Quicks.remove(id);
      console.log(id + ': removed from Quicks');
    }
  }
});
