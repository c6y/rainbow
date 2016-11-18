import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './quicksInput.html';

// Template helpers
Template.quicksInput.events({
  'submit .new-quick'(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name.value;
    const slug = target.slug.value;
    const query = target.query.value;
    console.log('name: ' + name);
    Meteor.call('quicks.insert', name, slug, query);
    // Clear form
    target.name.value = '';
    target.slug.value = '';
    target.query.value = '';
  }
});
