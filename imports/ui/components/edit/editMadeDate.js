// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editMadeDate.html';

Template.editMadeDate.helpers({
  // Display as GMT
  madeDateShort() {
    const date = this.madeDate;
    if (date === undefined) {
      return '';
    }
    const shortDate = date.toISOString().substring(0, 10);
    return shortDate;
  }
});

Template.editMadeDate.events({
  // Restore madeDate input to original value
  // if user leaves input and does not press return
  'blur .editMadeDate'(event, target) {
    let date = this.madeDate;
    if (date === undefined) {
      event.target.value = '';
    } else {
      const shortDate = date.toISOString().substring(0, 10);
      event.target.value = shortDate;
    }
  },
  'keyup .editMadeDate'(event, target) {
    // Update with new madeDate
    if (event.keyCode === 13) { // return submits new madeDate
      Meteor.call('eboypix.updateMadeDate', this._id, event.target.value);
      // Deselect input field
      event.target.blur();
    } else if (event.keyCode === 27) { // escape restores madeDate
      event.target.blur();
    }
  }
});
