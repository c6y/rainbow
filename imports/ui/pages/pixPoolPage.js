import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

import './pixPoolPage.html';

// Components used inside the template
import '../components/pixCount.html';
import '../components/pixCount.js';
import '../components/navigation/navPaging.html';
import '../components/navigation/navPaging.js';
import '../components/pixPool.html';
import '../components/pixPool.js';
import '../components/navigation/navLinks.html';
import '../components/navigation/navLinks.js';
import '../components/navigation/navPageInfo.js';
import '../components/navigation/navPageInfo.html';
import '../components/navigation/navSearch.js';
import '../components/navigation/navSearch.html';
import '../components/logo.js';
import '../components/logo.html';

// Template onCreated
Template.pixPoolPage.onCreated(function() {
  const self = this;
  const searchQuery = FlowRouter.getQueryParam('q');
  console.log('searchQuery Pool: ' + searchQuery);
  self.autorun(function() {
    const title = FlowRouter.getRouteName();
    const thisPage = FlowRouter.getParam('page');
    const thisSlug = FlowRouter.getParam('slug');

    DocHead.setTitle(title + '/' + thisPage);
    self.subscribe('pix.paged.public', thisSlug, thisPage, searchQuery);
    self.subscribe('colors.public');
  });
});
