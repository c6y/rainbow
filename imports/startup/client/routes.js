import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/applayout.js';
import '../../ui/pages/pixPoolPage.js';
import '../../ui/pages/colorsPoolPage.js';
import '../../ui/pages/spriteBoxPage.js';
import '../../ui/pages/beta1Page.js';

FlowRouter.route('/pool', {
  name: 'pool',
  action() {
    console.log('pool route is being rendered');
    BlazeLayout.render('applayout', { main: 'pixPoolPage' });
  }
});

FlowRouter.route('/colors', {
  name: 'colors',
  action() {
    console.log('colors route is being rendered');
    BlazeLayout.render('applayout', { main: 'colorsPoolPage' });
  }
});

FlowRouter.route('/spritebox/:_id', {
  name: 'spriteBox',
  action() {
    console.log('spritebox route is being rendered');
    BlazeLayout.render('applayout', { main: 'spriteBoxPage' });
  }
});

FlowRouter.route('/beta1', {
  name: 'beta1',
  action() {
    console.log('beta1 route is being rendered');
    BlazeLayout.render('applayout', { main: 'beta1Page' });
  }
});
