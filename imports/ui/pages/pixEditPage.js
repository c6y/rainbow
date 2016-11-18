import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './pixEditPage.html';

// Components used inside the template
import '../components/navigation/pixCount.html';
import '../components/navigation/pixCount.js';
import '../components/navigation/navPaging.html';
import '../components/navigation/navPaging.js';
import '../components/pixList.html';
import '../components/pixList.js';
import '../components/pixNone.html';
import '../components/pixNone.js';
import '../components/navigation/navLinks.html';
import '../components/navigation/navLinks.js';
import '../components/navigation/navPageInfo.js';
import '../components/navigation/navPageInfo.html';
import '../components/navigation/navSearch.js';
import '../components/navigation/navSearch.html';
import '../components/navigation/logo.js';
import '../components/navigation/logo.html';

// Template onCreated
Template.pixEditPage.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const title = FlowRouter.getRouteName();
    const thisPage = FlowRouter.getParam('page');
    const thisSlug = FlowRouter.getParam('slug');
    const searchQuery = FlowRouter.getQueryParam('q');

    DocHead.setTitle(title + '/' + thisPage);
    self.subscribe('pix.paged.public', thisSlug, thisPage, searchQuery);
    self.subscribe('colors.public');
  });
});

Template.pixEditPage.helpers({
  totalPixCount() {
    const pixCount = Counts.get('totalDocsCount');
    return pixCount > 0;
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
