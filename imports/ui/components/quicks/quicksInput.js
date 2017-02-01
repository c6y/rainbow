import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './quicksInput.html';

// Template helpers
Template.quicksInput.events({
  'submit .new-quick'(event) {
    event.preventDefault();
    const target = event.target;
    const label = target.label.value;
    const slug = target.slug.value;
    const query = target.query.value;
    const rank = target.rank.value;
    Meteor.call('quicks.insert', label, slug, query, rank);
    // Clear form
    target.query.value = 'tag';
    target.label.value = '';
    target.slug.value = '';
    target.rank.value = '';
  }
});
