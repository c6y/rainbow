import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.color.helpers({
  // Truncate the URL and return file name only
  colorName() {
    const name = this.name;
    return name;
  }
});
