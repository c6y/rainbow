import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

import './colorsPoolPage.html';

// Components used inside the template
import '../components/countColors.html';
import '../components/countColors.js';
import '../components/colorsPool.html';
import '../components/colorsPool.js';

// Template onCreated
Template.colorsPoolPage.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const title = FlowRouter.getRouteName();

    DocHead.setTitle(title);
    self.subscribe('colors.public');
  });
});
