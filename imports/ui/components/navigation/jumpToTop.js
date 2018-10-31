// Meteor stuff
import { Template } from 'meteor/templating';

import './jumpToTop.html';

// Template helpers
Template.jumpToTop.events({
  'click #jumpToTop'(event) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
});
