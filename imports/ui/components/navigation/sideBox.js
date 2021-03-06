// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Components
import './editorLinks.html';
import './editorLinks.js';
import './quickLinks.html';
import './quickLinks.js';

import './sideBox.html';

// Template onCreated
Template.sideBox.onCreated(function() {
  if (Session.get('plusBox') === undefined) {
    // set plusBox visibility at start
    const showPlusBox = Meteor.settings.public.navigation.extrasOnLanding;
    Session.set('plusBox', showPlusBox);
    Session.set('infoBox', false);
    Session.set('settingsBox', false);
  }
  const self = this;
  self.autorun(function() {
    self.subscribe('quicks.public');
  });
});

// Template helpers
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
  },
  copyright() {
    return Meteor.settings.public.ownership.creator.name;
  },
  showSideBoxCSS() {
    const isVisible = Session.get('plusBox');
    if (isVisible) {
      return 'sideShow';
    }
    return 'sideHide';
  },
  infoIconActive() {
    return Session.get('infoBox') ? 'iconActive' : false;
  },
  settingsIconActive() {
    return Session.get('settingsBox') ? 'iconActive' : false;
  },
  showInfo() {
    return Session.get('infoBox') === false ? 'showInfoOff' : false;
  },
  showSettings() {
    return Session.get('settingsBox') === false ? 'showSettingsOff' : false;
  },
  toEditorPath() {
    // define and set toRoute to 'edit' if not on 'edit'
    // else set toRoute to 'pool'
    let toRoute = FlowRouter.getRouteName();
    toRoute = toRoute === 'edit' ? 'pool' : 'edit';

    // define and set thisSlug to 'everything' if not defined
    let thisSlug = FlowRouter.getParam('slug');
    thisSlug = thisSlug === undefined ? 'everything' : thisSlug;

    // define and set thisPage to 1 if not defined
    let thisPage = FlowRouter.getParam('page');
    thisPage = thisPage ? thisPage : 1;

    // define and set thisQuery to null if not defined
    let thisQuery = FlowRouter.getQueryParam('q');
    thisQuery = thisQuery === '' ? null : thisQuery;

    return FlowRouter.path(
        toRoute,
        { slug: thisSlug, page: thisPage },
        { q: thisQuery },
    );
  },
});

// Template events
Template.sideBox.events({
  'click #info'() {
    const newstate = Session.get('infoBox') === false;
    Session.set('infoBox', newstate);
    Session.set('settingsBox', false);
  },
  'click #settings'() {
    const newstate = Session.get('settingsBox') === false;
    Session.set('settingsBox', newstate);
    Session.set('infoBox', false);
  },
});
