import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

import './beta1Page.html';

// Components used inside the template
import '../components/countDocs.html';
import '../components/countDocs.js';
import '../components/pixInput.html';
import '../components/pixInput.js';
import '../components/colorInput.html';
import '../components/colorInput.js';
import '../components/color.html';
import '../components/color.js';
import '../components/colorsPool.html';
import '../components/colorsPool.js';
import '../components/pic.html';
import '../components/pic.js';
import '../components/pixPool.html';
import '../components/pixPool.js';
import '../components/deleteAll.html';
import '../components/deleteAll.js';

// Template onCreated
Template.beta1Page.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const title = FlowRouter.getRouteName();

    DocHead.setTitle(title);
    self.subscribe('pix.public');
    self.subscribe('colors.public');
  });
});
