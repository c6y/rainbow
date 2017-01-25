import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './linkStrip.html';

// Components used inside the template
import './navLinks.html';
import './navLinks.js';
import './quickLinks.html';
import './quickLinks.js';

// Template onCreated
Template.linkStrip.onCreated(function() {
  Session.set('plusBox', false); // hide plusBox at start
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
  },
  // toggle linkStrip via navPaging template
  isVisible() {
    const foo = Session.get('plusBox');
    return foo;
  }
});
