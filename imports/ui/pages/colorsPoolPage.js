import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

import './colorsPoolPage.html';

// Components used inside the template
import '../components/poolHeader.html';
import '../components/poolHeader.js';
import '../components/colorsPool.html';
import '../components/colorsPool.js';

// Template helpers
Template.colorsPoolPage.onCreated(function() {
  // Set document title
  this.autorun(function() {
    const title = FlowRouter.getRouteName();
    DocHead.setTitle(title);
  });
});
