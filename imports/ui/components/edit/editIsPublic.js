// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editIsPublic.html';

Template.editIsPublic.events({
  // Switch between true and false
  'click .editIsPublic'(event, target) {
    const oldState = this.isPublic;
    // Set oldState to false, if undefined or false;
    const oldStateFixed = oldState === true;
    // Set to opposing value
    const newState = oldStateFixed === false;
    Meteor.call('eboypix.updateIsPublic', this._id, newState);
  }
});
