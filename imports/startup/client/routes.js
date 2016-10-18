import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/applayout.js';
import '../../ui/pages/pixPoolPage.js';
import '../../ui/pages/colorsPoolPage.js';

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
