import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './editCopyright.html';

Template.editCopyright.onCreated(function() {
  const self = this;
  self.TargetValuesCache = new ReactiveDict();
  // self.autorun(function() {
  //   console.log('current copyright: ' + self.TargetValuesCache.get('copyright'));
  // });
});

Template.editCopyright.events({
  // // // Edit copyright events
  'click .editCopyright'(event, target) {
    // Store originalcopyright in ReactiveDict
    target.TargetValuesCache.set('copyright', this.copyright);
  },
  'blur .editCopyright'(event, target) {
    // Restore copyright input to original value
    // if user leaves input and does not press return
    const originalCopyright = target.TargetValuesCache.get('copyright');
    this.copyright = originalCopyright;
    event.target.value = originalCopyright;
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
