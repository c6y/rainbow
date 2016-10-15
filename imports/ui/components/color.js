import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './color.html';

// import { Colors } from '../api/colors/colors.js';

Template.color.helpers({
  // Truncate the URL and return file name only
  colorName() {
    const name = this.name;
    return name;
  }
});

Template.color.events({
  'click .removeColor'() {
    Meteor.call('color.delete', this._id);
  }
});
