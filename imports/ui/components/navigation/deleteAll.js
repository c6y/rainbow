import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.deleteAll.events({
  'click .deleteAllPix'() {
    Meteor.call('eboypix.deleteAll');
  },
  'click .deleteAllColors'() {
    Meteor.call('colors.deleteAll');
  }
});
