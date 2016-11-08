import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './dashboard.html';

Template.dashboard.events({
  'click .logout'(event) {
    event.preventDefault();
    Meteor.logout();
  }
});
