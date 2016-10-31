import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editBackColor.html';

Template.editBackColor.events({
  'blur .editBackColor'(event, target) {
    // Restore backgroundColor input to original value
    // if user leaves input and does not press return
    event.target.value = this.backgroundColor;
  },
  'keyup .editBackColor'(event, target) {
    if (event.keyCode === 13) { // return key submits new backgroundColor
      Meteor.call('eboypix.updateBackColor', this._id, event.target.value);
      // Deselect input field
      event.target.blur();
    } else if (event.keyCode === 27) { // escape restores backgroundColor
      event.target.blur();
    }
  }
});
