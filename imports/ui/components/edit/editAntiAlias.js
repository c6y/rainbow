// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editAntiAlias.html';

Template.editAntiAlias.events({
  // Switch between true and false
  'click .editAntiAlias'(event, target) {
    const oldState = this.antiAlias;
    // Set oldState to false, if undefined or false;
    const oldStateFixed = oldState === true;
    // Set to opposing value
    const newState = oldStateFixed === false;
    Meteor.call('eboypix.updateAntiAlias', this._id, newState);
  },
});
