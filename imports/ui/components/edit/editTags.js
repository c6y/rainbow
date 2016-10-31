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

Template.editTags.helpers({
  allTags() {
    const tagsString = String(this.tags);
    const tagsStringSpaced = tagsString.replace(/,/g, ', ');
    return tagsStringSpaced;
  }
});

Template.editTags.events({
  // Clean input in real-time
  'input .editTags'(event, target) {
    const originalTags = event.target.value.toLowerCase();
    // only allow alphanumeric, commas and minus chars
    const tagsStringClean = originalTags.replace(/[^a-z0-9,-]/gi, '');
    // for nice display, add a space after commas
    const tagsStringSpaced = tagsStringClean.replace(/,/g, ', ');
    // live update input value
    event.target.value = tagsStringSpaced;
  },
  'blur .editTags'(event, target) {
    // Restore tags input to original value
    // if user leaves input and does not press return
    const tagsString = String(this.tags);
    // for nice display, add a space after commas
    const tagsStringSpaced = tagsString.replace(/,/g, ', ');
    event.target.value = tagsStringSpaced;
  },
  'keyup .editTags'(event, target) {
    if (event.keyCode === 13) { // return key submits new tags
      const tagsString = event.target.value;
      // Only allow alphanumerics, commas and minus
      let tagsStringClean = tagsString.replace(/[^a-z0-9,-]/gi, '');
      // Remove initial and trailing commas
      tagsStringClean = tagsStringClean.replace(/(,*$)|(^,)/gi, '');
      // Turn string into a tags array
      const tagsArray = tagsStringClean.split(',');
      Meteor.call('eboypix.updateTags', this._id, tagsArray);
      // Deselect input field
      event.target.blur();
    } else if (event.keyCode === 27) { // escape restores tags
      event.target.blur();
    }
  }
});
