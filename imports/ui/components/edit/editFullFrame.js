import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editFullFrame.html';

Template.editFullFrame.events({
  // Switch between true and false
  'click .editFullFrame'(event, target) {
    const oldState = this.fullFrame;
    // Set oldState to false, if undefined or false;
    const oldStateFixed = oldState === true;
    // Set to opposing value
    const newState = oldStateFixed === false;
    Meteor.call('eboypix.updateFullFrame', this._id, newState);
  }
});
