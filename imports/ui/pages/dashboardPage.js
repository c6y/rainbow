// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { DocHead } from 'meteor/kadira:dochead';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Components
import '../components/register.html';
import '../components/register.js';
import '../components/login.html';
import '../components/login.js';
import '../components/dashboard.html';
import '../components/dashboard.js';
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
  }
});

Template.dashboardPage.events({
  'click .toggleLogin'() {
    const oldState = Template.instance().showRegister.get();
    const newState = oldState === false;
    Template.instance().showRegister.set(newState);
  }
});
