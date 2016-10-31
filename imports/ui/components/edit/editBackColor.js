import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './editBackColor.html';

Template.editBackColor.onCreated(function() {
  const self = this;
  self.TargetValuesCache = new ReactiveDict();
  // self.autorun(function() {
  //   console.log('current backgroundColor: ' + self.TargetValuesCache.get('backgroundColor'));
  // });
});

Template.editBackColor.events({
  // // // Edit backgroundColor events
  'click .editBackColor'(event, target) {
    // Store originalbackgroundColor in ReactiveDict
    target.TargetValuesCache.set('backgroundColor', this.backgroundColor);
  },
  'blur .editBackColor'(event, target) {
    // Restore backgroundColor input to original value
    // if user leaves input and does not press return
    const originalBackColor = target.TargetValuesCache.get('backgroundColor');
    this.backgroundColor = originalBackColor;
    event.target.value = originalBackColor;
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
