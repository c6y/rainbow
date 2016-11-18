import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

import './quicksPage.html';

// Components used inside the template
import '../components/colors/countColors.html';
import '../components/colors/countColors.js';
import '../components/colors/quicksInput.html';
import '../components/colors/quicksInput.js';
import '../components/colors/colorsPool.html';
import '../components/colors/colorsPool.js';
import '../components/navigation/logo.js';
import '../components/navigation/logo.html';

// Template onCreated
Template.quicksPage.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const title = FlowRouter.getRouteName();

    DocHead.setTitle(title);
    self.subscribe('colors.public');
  });
});
