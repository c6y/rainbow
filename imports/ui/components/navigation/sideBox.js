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
    Session.set('adminBox', false);
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
  showInfoBox() {
    return Session.get('infoBox');
  },
  showSettingsBox() {
    return Session.get('adminBox');
  },
  toEditorPath() {
    const thisRouteName = FlowRouter.getRouteName();
    let thisPage = 1;
    let thisSlug = 'everything';
    let thisQuery = null;
    if (thisRouteName === 'edit') {
      return FlowRouter.path(
        'pool',
        { slug: thisSlug, page: thisPage },
        { q: thisQuery }
      );
    }
    if (thisRouteName === 'pool') {
      thisSlug = FlowRouter.getParam('slug');
      thisPage = FlowRouter.getParam('page');
      thisQuery = FlowRouter.getQueryParam('q');
    }
    return FlowRouter.path(
      'edit',
      { slug: thisSlug, page: thisPage },
      { q: thisQuery }
    );
  }
});

// Template events
Template.sideBox.events({
  'click #info'() {
    const newstate = Session.get('infoBox') === false;
    Session.set('infoBox', newstate);
    Session.set('adminBox', false);
  },
  'click #settings'() {
    const newstate = Session.get('adminBox') === false;
    Session.set('adminBox', newstate);
    Session.set('infoBox', false);
  }
});
