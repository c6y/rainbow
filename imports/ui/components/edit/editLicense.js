import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './editLicense.html';

Template.editLicense.onCreated(function() {
  const self = this;
  self.TargetValuesCache = new ReactiveDict();
  // self.autorun(function() {
  //   console.log('current license: ' + self.TargetValuesCache.get('license'));
  // });
});

Template.editLicense.events({
  // // // Edit license events
  'click .editLicense'(event, target) {
    // Store original license in ReactiveDict
    target.TargetValuesCache.set('license', this.license);
  },
  'blur .editLicense'(event, target) {
    // Restore license input to original value
    // if user leaves input and does not press return
    const originalLicense = target.TargetValuesCache.get('license');
    this.license = originalLicense;
    event.target.value = originalLicense;
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
