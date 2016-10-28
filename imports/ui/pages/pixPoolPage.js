import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

import './pixPoolPage.html';

// Components used inside the template
import '../components/countDocs.html';
import '../components/countDocs.js';
import '../components/paging.html';
import '../components/paging.js';
import '../components/pixPool.html';
import '../components/pixPool.js';
import '../components/navLinks.html';
import '../components/navLinks.js';
import '../components/navHere.js';
import '../components/navHere.html';

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
