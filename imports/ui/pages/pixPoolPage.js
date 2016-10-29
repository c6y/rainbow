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

// Template onCreated
Template.pixPoolPage.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const title = FlowRouter.getRouteName();
    const thisPage = FlowRouter.getParam('page');

    DocHead.setTitle(title + '/' + thisPage);
    self.subscribe('pix.paged.public', thisPage);
    self.subscribe('colors.public');
  });
});
