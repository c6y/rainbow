import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

import './beta1Page.html';

// Components used inside the template
import '../components/pixCount.html';
import '../components/pixCount.js';
import '../components/pixInput.html';
import '../components/pixInput.js';
import '../components/colors/colorInput.html';
import '../components/colors/colorInput.js';
import '../components/colors/color.html';
import '../components/colors/color.js';
import '../components/colors/colorsPool.html';
import '../components/colors/colorsPool.js';
import '../components/picSprite.html';
import '../components/picSprite.js';
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
