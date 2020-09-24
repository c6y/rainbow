// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Counts } from 'meteor/tmeasday:publish-counts';

// Functions
import { setDocHead } from '../../functions/client/setDocHead.js';

// Components
import '../components/navigation/pixCount.html';
import '../components/navigation/pixCount.js';
import '../components/navigation/navPaging.html';
import '../components/navigation/navPaging.js';
import '../components/pix/pixList.html';
import '../components/pix/pixList.js';
import '../components/pix/pixNone.html';
import '../components/pix/pixNone.js';
import '../components/navigation/navPageInfo.js';
import '../components/navigation/navPageInfo.html';
import '../components/navigation/logo.js';
import '../components/navigation/logo.html';
import '../components/navigation/sideBox.js';
import '../components/navigation/sideBox.html';
import '../components/navigation/searchBox.js';
import '../components/navigation/searchBox.html';

import './pixEditPage.html';

// Template onCreated
Template.pixEditPage.onCreated(function() {
  const self = this;
  self.autorun(function() {
    setDocHead();

    const thisPage = FlowRouter.getParam('page');
    const thisSlug = FlowRouter.getParam('slug');
    const query = FlowRouter.getQueryParam('q');
    self.subscribe('pix.paged.public', thisSlug, thisPage, query);
    self.subscribe('colors.public');
    self.subscribe('cssbacks.public');
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
  },
});
