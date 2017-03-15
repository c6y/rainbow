// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editLink.html';

Template.editLink.helpers({
  // initialInputWidth() {
  //   // Set initial width of input field based on length of string
  //   const lengthStr = Math.max(this.shopLink.length, 2);
  //   return lengthStr;
  // }
});

Template.editLink.events({
  // 'input .editLink'(event, target) {
  //   // Update width of input field as you type
  //   const lengthStr = Math.max(event.target.value.length, 6);
  //   event.target.setAttribute('size', lengthStr);
  // },
  // 'blur .editLink'(event, target) {
  //   // Restore shopLink input to original value
  //   // if user leaves input and does not press return
  //   event.target.value = this.shopLink;
  //   // Restore width of input field
  //   event.target.setAttribute('size', Math.max(this.shopLink.length, 2));
  // },
  'keyup .editLink'(event, target) {
    if (event.keyCode === 13) { // return key submits new shopLink
      Meteor.call('eboypix.updateLink', this._id, event.target.value);
      // Deselect input field
      event.target.blur();
    } else if (event.keyCode === 27) { // escape restores shopLink
      event.target.blur();
    }
  }
});
