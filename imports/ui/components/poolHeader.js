import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Colors } from '../../api/colors/colors.js';

Template.poolHeader.helpers({
  pixCounter() {
    return Counts.get('pixCount');
  },
  colorCounter() {
    return Colors.find({}).count();
  }
});

Template.poolHeader.events({
  'click .deleteAllDocs'() {
    Meteor.call('eboypix.deleteAll');
  },
  'click .deleteAllColors'() {
    Meteor.call('colors.deleteAll');
  }
});
