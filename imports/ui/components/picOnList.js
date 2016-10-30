import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Colors } from '../../api/colors/colors.js';

import './picOnList.html';

// Components used
import './picSprite.js';
import './picSprite.html';
import './picMeta.js';
import './picMeta.html';

Template.picOnList.onCreated(function() {
  const self = this;
  self.TargetValuesCache = new ReactiveDict();
  self.autorun(function() {
    console.log('current license: ' + self.TargetValuesCache.get('license'));
  });
});

Template.picOnList.helpers({
  colorHSL() {
    // Get the color by name
    const color = Colors.findOne(
      { name: this.backgroundColor }
    );
    // If it's in the color database return hsl values as css hsl string
    if (color) {
      const hslColor = String(
        'hsl(' +
        color.hue + ', ' +
        color.saturation + '%, ' +
        color.luminosity + '%)'
      );
      return {
        info: hslColor,
        value: hslColor
      };
    }
    // If color does not exist return diagonal stripes warning pattern
    const emptyColor = 'repeating-linear-gradient(' +
      '135deg,' +
      'transparent,' +
      'transparent 0.5rem,' +
      '#ccc 0.5rem,' +
      '#ccc 1rem' +
      ')';
    return {
      info: 'Warning! Assign a color!',
      value: emptyColor
    };
  },
  currentLicense() {
    const originalLicense = this.TargetValuesCache.get('license');
    return originalLicense;
  }
});

// Template events
Template.picOnList.events({
  'click .deletePic'() {
    Meteor.call('eboypix.delete', this._id);
  },
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
    if (event.keyCode === 13) { // return key submits new license
      Meteor.call('eboypix.updateLicense', this._id, event.target.value);
      // Deselect input field
      event.target.blur();
    } else if (event.keyCode === 27) { // escape restores license
      event.target.blur();
    }
  },
  // // // Edit copyright events
  'click .editCopyright'(event, target) {
    // Store original license in ReactiveDict
    target.TargetValuesCache.set('copyright', this.copyright);
  },
  'blur .editCopyright'(event, target) {
    // Restore copyright input to original value
    // if user leaves input and does not press return
    const originalLicense = target.TargetValuesCache.get('copyright');
    this.copyright = originalLicense;
    event.target.value = originalLicense;
  },
  'keyup .editCopyright'(event, target) {
    if (event.keyCode === 13) { // return key submits new copyright
      Meteor.call('eboypix.updateCopyright', this._id, event.target.value);
      // Deselect input field
      event.target.blur();
    } else if (event.keyCode === 27) { // escape restores copyright
      event.target.blur();
    }
  }
});
