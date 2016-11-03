import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

import './pixListPage.html';

// Components used inside the template
import '../components/pixCount.html';
import '../components/pixCount.js';
import '../components/navigation/navPaging.html';
import '../components/navigation/navPaging.js';
import '../components/pixList.html';
import '../components/pixList.js';
import '../components/navigation/navLinks.html';
import '../components/navigation/navLinks.js';
import '../components/navigation/navPageInfo.js';
import '../components/navigation/navPageInfo.html';
import '../components/navigation/navSearch.js';
import '../components/navigation/navSearch.html';

// Template onCreated
Template.pixListPage.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const title = FlowRouter.getRouteName();
    const thisPage = FlowRouter.getParam('page');
    const thisSlug = FlowRouter.getParam('slug');

    DocHead.setTitle(title + '/' + thisPage);
    self.subscribe('pix.paged.public', thisSlug, thisPage);
    self.subscribe('colors.public');
  });
});
