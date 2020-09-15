// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editLicense.html';

Template.editLicense.helpers({
  initialInputWidth() {
    // Set initial width of input field based on length of string
    const lengthStr = Math.max(this.license.length, 2);
    return lengthStr;
  },
});

Template.editLicense.events({
  'input .editLicense'(event, target) {
    // Update width of input field as you type
    const lengthStr = Math.max(event.target.value.length, 2);
    event.target.setAttribute('size', lengthStr);
  },
  'blur .editLicense'(event, target) {
    // Restore licens input to original value
    // if user leaves input and does not press return
    event.target.value = this.license;
    // Restore width of input field
    event.target.setAttribute('size', Math.max(this.license.length, 2));
  },
  'keyup .editLicense'(event, target) {
    if (event.keyCode === 13) { // return submits new license
      Meteor.call('eboypix.updateLicense', this._id, event.target.value);
      // Deselect input field
      event.target.blur();
    } else if (event.keyCode === 27) { // escape restores license
      event.target.blur();
    }
  },
});
