import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './devicesInput.html';

// Template helpers
Template.devicesInput.events({
  'submit .new-device'(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name.value;
    const make = target.make.value;
    const width = target.width.value;
    const height = target.height.value;

    Meteor.call('devices.insert', name, make, width, height);

    console.log('name: ' + name);
    console.log('make: ' + make);
    console.log('width: ' + width);
    console.log('height: ' + height);

    // Clear form
    target.name.value = '';
    target.make.value = '';
    target.width.value = '';
    target.height.value = '';
  }
});
