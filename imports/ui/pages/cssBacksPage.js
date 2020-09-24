// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

// Components
// import '../components/colors/countColors.html';
// import '../components/colors/countColors.js';

import '../components/cssbacks/cssBackInput.html';
import '../components/cssbacks/cssBackInput.js';
import '../components/cssbacks/cssBacksPool.html';
import '../components/cssbacks/cssBacksPool.js';

import '../components/navigation/logo.js';
import '../components/navigation/logo.html';
import '../components/navigation/sideBox.js';
import '../components/navigation/sideBox.html';

import './cssBacksPage.html';

// Template onCreated
Template.cssBacksPage.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const title = FlowRouter.getRouteName();

    DocHead.setTitle(title + ' · eboy.io');
    self.subscribe('cssbacks.public');
  });
});

Template.cssBacksPage.helpers({
  isAdminOrEditor() {
    if (Meteor.user()) {
      const isAdmin = Meteor.user().profile.isAdmin;
      const isEditor = Meteor.user().profile.isEditor;
      return isAdmin || isEditor;
    }
    return false;
  },
});
