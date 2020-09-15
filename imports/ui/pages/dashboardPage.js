// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { DocHead } from 'meteor/kadira:dochead';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Components
import '../components/dashboard/register.html';
import '../components/dashboard/register.js';
import '../components/dashboard/login.html';
import '../components/dashboard/login.js';
import '../components/dashboard/accessinfo.html';
import '../components/dashboard/accessinfo.js';
import '../components/dashboard/dashboard.html';
import '../components/dashboard/dashboard.js';
import '../components/navigation/sideBox.js';
import '../components/navigation/sideBox.html';

import './dashboardPage.html';

Template.dashboardPage.onCreated(function() {
  this.showRegister = new ReactiveVar(false);
  const self = this;
  self.autorun(function() {
    const route = FlowRouter.getRouteName();
    DocHead.setTitle(route + ' · eboy.io');
  });
});

Template.dashboardPage.helpers({
  switchRegisterLogin() {
    return Template.instance().showRegister.get();
  },
  // Check settings.json if new users are allowed
  allowToSelfRegister() {
    return Meteor.settings.public.userSetup.allowSelfRegister;
  },
  isAdminOrEditor() {
    if (Meteor.user()) {
      const isAdmin = Meteor.user().profile.isAdmin;
      const isEditor = Meteor.user().profile.isEditor;
      return isAdmin || isEditor;
    }
    return false;
  },
});

Template.dashboardPage.events({
  'click .toggleLogin'() {
    const oldState = Template.instance().showRegister.get();
    const newState = oldState === false;
    Template.instance().showRegister.set(newState);
  },
});
