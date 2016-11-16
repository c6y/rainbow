import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

import './colorsPoolPage.html';

// Components used inside the template
import '../components/colors/countColors.html';
import '../components/colors/countColors.js';
import '../components/colors/colorInput.html';
import '../components/colors/colorInput.js';
import '../components/colors/colorsPool.html';
import '../components/colors/colorsPool.js';
import '../components/navigation/logo.js';
import '../components/navigation/logo.html';

// Template onCreated
Template.colorsPoolPage.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const title = FlowRouter.getRouteName();

    DocHead.setTitle(title);
    self.subscribe('colors.public');
  });
});
