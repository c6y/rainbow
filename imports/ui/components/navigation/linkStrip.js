import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { FlowRouter } from 'meteor/kadira:flow-router';

import './linkStrip.html';

// Components used inside the template
import './navLinks.html';
import './navLinks.js';
import './quickLinks.html';
import './quickLinks.js';

// Template onCreated
Template.linkStrip.onCreated(function() {
  const self = this;
  self.autorun(function() {
    self.subscribe('quicks.public');
  });
});

Template.linkStrip.helpers({
  isAdminOrEditor() {
    if (Meteor.user()) {
      const isAdmin = Meteor.user().profile.isAdmin;
      const isEditor = Meteor.user().profile.isEditor;
      return isAdmin || isEditor;
    }
    return false;
  }
});
