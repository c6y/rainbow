import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editCopyright.html';

Template.editCopyright.events({
  'blur .editCopyright'(event, target) {
    // Restore copyright input to original value
    // if user leaves input and does not press return
    event.target.value = this.copyright;
  },
  'keyup .editCopyright'(event, target) {
    if (event.keyCode === 13) { // return key submits newcopyright
      Meteor.call('eboypix.updateCopyright', this._id, event.target.value);
      // Deselect input field
      event.target.blur();
    } else if (event.keyCode === 27) { // escape restorescopyright
      event.target.blur();
    }
  }
});
