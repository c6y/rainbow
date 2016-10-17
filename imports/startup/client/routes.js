import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/applayout.js';
import '../../ui/pages/pixPoolPage.js';

FlowRouter.route('/pool', {
  name: 'pool',
  action() {
    console.log('pool route is being rendered');
    BlazeLayout.render('applayout', { main: 'pixPoolPage' });
  }
});
