import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editCopyright.html';

Template.editCopyright.helpers({
  initialInputWidth() {
    // Set initial width of input field based on length of string
    const lengthStr = Math.max(this.copyright.length, 2);
    return lengthStr;
  },
});

Template.editCopyright.events({
  'input .editCopyright'(event, target) {
    // Update width of input field as you type
    const lengthStr = Math.max(event.target.value.length, 6);
    event.target.setAttribute('size', lengthStr);
  },
  'blur .editCopyright'(event, target) {
    // Restore copyright input to original value
    // if user leaves input and does not press return
    event.target.value = this.copyright;
    // Restore width of input field
    event.target.setAttribute('size', Math.max(this.copyright.length, 2));
  },
  'keyup .editCopyright'(event, target) {
    if (event.keyCode === 13) { // return key submits newcopyright
      Meteor.call('eboypix.updateCopyright', this._id, event.target.value);
      // Deselect input field
      event.target.blur();
    } else if (event.keyCode === 27) { // escape restorescopyright
      event.target.blur();
    }
  },
});
