import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

import './spriteBoxPage.html';

// Components used inside the template
import '../components/spriteBox.html';
import '../components/spriteBox.js';

// Template onCreated
Template.spriteBoxPage.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const title = FlowRouter.getRouteName();
    const thisId = FlowRouter.getParam('_id');

    DocHead.setTitle(title);

    self.subscribe('pix.single.public', thisId);
    self.subscribe('colors.public');
  });
});
