import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

import './pixPoolPage.html';

// Components used inside the template
import '../components/poolHeader.html';
import '../components/poolHeader.js';
import '../components/pixPool.html';
import '../components/pixPool.js';

// Template helpers
Template.pixPoolPage.onCreated(function() {
// Set document title
  this.autorun(function() {
    const title = FlowRouter.getRouteName();
    DocHead.setTitle(title);
  });
});
