// Meteor stuff
import { Meteor } from 'meteor/meteor';

// Collections
import { Colors } from './colors.js';

// Functions
import { cleanString } from '../../functions/server/cleanString.js';
import { tagsToArray } from '../../functions/server/tagsToArray.js';
import { isAdminOrEditor, isAdmin } from '../../functions/server/isUser.js';

Meteor.methods({
  'colors.insert'(n, h, s, l, a, t) {
    if (isAdminOrEditor()) {
      const tagsArray = tagsToArray(t);
      const colorName = cleanString(n);
      Colors.insert({
        name: colorName,
        createdAt: new Date(),
        hue: h,
        saturation: s,
        luminosity: l,
        alpha: a,
        tags: tagsArray,
      });
      console.log(colorName + ': inserted to Colors');
    }
  },
  'colors.deleteAll'() {
    if (isAdmin()) {
      Colors.remove({});
      console.log('removed all documents from Colors');
    }
  },
  'color.delete'(id) {
    if (isAdminOrEditor()) {
      Colors.remove(id);
      console.log(id + ': removed from Colors');
    }
  },
});
