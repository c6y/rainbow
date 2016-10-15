import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { EboyPix } from '../../api/eboypix/eboypix.js';
import { Colors } from '../../api/colors/colors.js';

Template.poolHeader.helpers({
  pixCounter() {
    return EboyPix.find({}).count();
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
