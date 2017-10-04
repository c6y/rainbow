// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

// Components
// import '../components/colors/countColors.html';
// import '../components/colors/countColors.js';
// import '../components/quicks/quicksInput.html';
// import '../components/quicks/quicksInput.js';
// import '../components/quicks/quicksPool.html';
// import '../components/quicks/quicksPool.js';
import '../components/devices/devicesInput.html';
import '../components/devices/devicesInput.js';
import '../components/devices/devicesPool.html';
import '../components/devices/devicesPool.js';
import '../components/navigation/logo.js';
import '../components/navigation/logo.html';
import '../components/navigation/sideBox.js';
import '../components/navigation/sideBox.html';

import './devicesPage.html';

// Template onCreated
Template.devicesPage.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const title = FlowRouter.getRouteName();
    DocHead.setTitle(title + ' · eboy.io');
    self.subscribe('devices.public');
  });
});

Template.devicesPage.helpers({
  isAdminOrEditor() {
    if (Meteor.user()) {
      const isAdmin = Meteor.user().profile.isAdmin;
      const isEditor = Meteor.user().profile.isEditor;
      return isAdmin || isEditor;
    }
    return false;
  }
});
