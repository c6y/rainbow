import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './cssBackInput.html';

// Template helpers
Template.cssBackInput.events({
  'submit .new-cssBack'(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name.value;
    const code = target.code.value;
    const cleanedCode = code.trim().replace(/\s+/g, ' ');
    Meteor.call('cssbacks.insert', name, cleanedCode);
    // Clear form
    target.name.value = '';
    target.code.value = '';
  },
});
