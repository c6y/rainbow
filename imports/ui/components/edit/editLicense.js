import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editLicense.html';

Template.editLicense.events({
  'blur .editLicense'(event, target) {
    // Restore licens input to original value
    // if user leaves input and does not press return
    event.target.value = this.license;
  },
  'keyup .editLicense'(event, target) {
    if (event.keyCode === 13) { // return submits new license
      Meteor.call('eboypix.updateLicense', this._id, event.target.value);
      // Deselect input field
      event.target.blur();
    } else if (event.keyCode === 27) { // escape restores license
      event.target.blur();
    }
  }
});
