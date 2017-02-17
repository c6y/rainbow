// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

// Components
import './editorLinks.html';
import './editorLinks.js';
import './quickLinks.html';
import './quickLinks.js';

import './sideBox.html';

// Template onCreated
Template.sideBox.onCreated(function() {
  if (Session.get('plusBox') === undefined) {
    Session.set('plusBox', false); // hide plusBox at start
  }
  const self = this;
  self.autorun(function() {
    self.subscribe('quicks.public');
  });
});

Template.sideBox.helpers({
  isAdminOrEditor() {
    if (Meteor.user()) {
      const isAdmin = Meteor.user().profile.isAdmin;
      const isEditor = Meteor.user().profile.isEditor;
      return isAdmin || isEditor;
    }
    return false;
  },
  // toggle sideBox via navPaging template
  isVisible() {
    const foo = Session.get('plusBox');
    return foo;
  },
  thisYear() {
    return new Date().getFullYear();
  }
});
