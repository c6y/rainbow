import { Meteor } from 'meteor/meteor';

import { Colors } from './colors.js';

import {
  tagsToArray,
  cleanString
} from '../functions.js';

Meteor.methods({
  'colors.insert'(n, h, s, l, a, t) {
    const tagsArray = tagsToArray(t);
    const colorName = cleanString(n);
    Colors.insert({
      name: colorName,
      createdAt: new Date(),
      hue: h,
      saturation: s,
      luminosity: l,
      alpha: a,
      tags: tagsArray
    });
  },
  'colors.deleteAll'() {
    Colors.remove({});
  },
  'color.delete'(id) {
    Colors.remove(id);
  }
});
