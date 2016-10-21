import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

import './spriteBoxPage.html';

// Components used inside the template
import '../components/spriteBox.html';
import '../components/spriteBox.js';

// Template helpers
Template.spriteBoxPage.onCreated(function() {
  // Set document title
  this.autorun(function() {
    const title = FlowRouter.getRouteName();
    DocHead.setTitle(title);
  });
});
