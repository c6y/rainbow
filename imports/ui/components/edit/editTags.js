import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './editTags.html';

Template.editTags.onCreated(function() {
  const self = this;
  self.TargetValuesCache = new ReactiveDict();
  // self.autorun(function() {
  //   console.log('current tags: ' + self.TargetValuesCache.get('tags'));
  // });
});

Template.editTags.events({
  // // // Edit tags events
  'click .editTags'(event, target) {
    // Store original tags in ReactiveDict
    target.TargetValuesCache.set('tags', this.tags);
  },
  'blur .editTags'(event, target) {
    // Restore tags input to original value
    // if user leaves input and does not press return
    const originalTags = target.TargetValuesCache.get('tags');
    this.tags = originalTags;
    event.target.value = originalTags;
  },
  'keyup .editTags'(event, target) {
    if (event.keyCode === 13) { // return key submits new tags
      Meteor.call('eboypix.updateTags', this._id, event.target.value);
      // Deselect input field
      event.target.blur();
    } else if (event.keyCode === 27) { // escape restores tags
      event.target.blur();
    }
  }
});
