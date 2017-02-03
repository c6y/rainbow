// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

// Components
import '../components/navigation/linkStrip.js';
import '../components/navigation/linkStrip.html';
import '../components/colors/countColors.html';
import '../components/colors/countColors.js';
import '../components/colors/colorInput.html';
import '../components/colors/colorInput.js';
import '../components/colors/colorsPool.html';
import '../components/colors/colorsPool.js';
import '../components/navigation/logo.js';
import '../components/navigation/logo.html';
import '../components/navigation/sideBox.js';
import '../components/navigation/sideBox.html';

import './colorsPage.html';

// Template onCreated
Template.colorsPage.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const title = FlowRouter.getRouteName();

    DocHead.setTitle(title);
    self.subscribe('colors.public');
  });
});

Template.colorsPage.helpers({
  isAdminOrEditor() {
    if (Meteor.user()) {
      const isAdmin = Meteor.user().profile.isAdmin;
      const isEditor = Meteor.user().profile.isEditor;
      return isAdmin || isEditor;
    }
    return false;
  }
});
