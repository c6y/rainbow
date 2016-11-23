import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// Components used inside the template
import '../components/register.html';
import '../components/register.js';
import '../components/login.html';
import '../components/login.js';
import '../components/dashboard.html';
import '../components/dashboard.js';
import '../components/navigation/navLinks.html';
import '../components/navigation/navLinks.js';
import '../components/navigation/quickLinks.html';
import '../components/navigation/quickLinks.js';

import './dashboardPage.html';

Template.dashboardPage.onCreated(function() {
  this.showRegister = new ReactiveVar(false);
});

Template.dashboardPage.helpers({
  switchRegisterLogin() {
    return Template.instance().showRegister.get();
  },
  // Check settings.json if new users are allowed
  allowNewUsers() {
    return Meteor.settings.public.allowNewUsers;
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
