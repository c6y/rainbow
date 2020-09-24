// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editBackPattern.html';

Template.editBackPattern.events({
  'keyup .editBackPattern'(event, target) {
    if (event.keyCode === 13) { // return key submits new backgroundPattern
      Meteor.call('eboypix.updateBackPattern', this._id, event.target.value);
      // Deselect input field
      event.target.blur();
    } else if (event.keyCode === 27) { // escape restores backgroundPattern
      event.target.blur();
    }
  },
});
