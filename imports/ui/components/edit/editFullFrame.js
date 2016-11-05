import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editFullFrame.html';

// Template.editFullFrame.helpers({
//   isFullFrame() {
//     console.log('this.fullFrame: ' + this.fullFrame);
//     return this.fullFrame;
//   }
// });

// Template.editFullFrame.onCreated(function() {
//   if (this.fullFrame === undefined) {
//     console.log('UNDEFINED: ' + this._id);
//     Meteor.call('eboypix.updateFullFrame', this._id, false);
//   }
// });

Template.editFullFrame.events({
  // Switch to true/false
  'click .editFullFrame'(event, target) {
    // const toState = this.fullFrame === false | 'undefined' ? true : false;
    // console.log('toState: ' + toState);
    Meteor.call('eboypix.updateFullFrame', this._id);
    // console.log('result for this.fullFrame: ' + this.fullFrame);
  }
});
