import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.colorInput.events({
  'submit .new-color'(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name.value;
    const hue = target.hue.value;
    const lum = target.luminosity.value;
    const sat = target.saturation.value;
    const tag = target.tag.value;
    Meteor.call('colors.insert', name, hue, sat, lum, 1, tag);
    // Clear form
    target.name.value = '';
    target.hue.value = '';
    target.luminosity.value = '';
    target.saturation.value = '';
  }
});
