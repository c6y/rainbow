import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import layouts
import '../../ui/layouts/applayout.js';

// Import pages
import '../../ui/pages/pixPoolPage.js';
import '../../ui/pages/colorsPoolPage.js';
import '../../ui/pages/spriteBoxPage.js';
import '../../ui/pages/beta1Page.js';

FlowRouter.route('/pool/:page', {
  name: 'pool',
  action() {
    console.log('pool route is being rendered');
    BlazeLayout.render('applayout', {
      main: 'pixPoolPage'
    });
  }
});

FlowRouter.route('/colors', {
  name: 'colors',
  action() {
    console.log('colors route is being rendered');
    BlazeLayout.render('applayout', {
      main: 'colorsPoolPage'
    });
  }
});

FlowRouter.route('/spritebox/:_id', {
  name: 'spriteBox',
  action() {
    console.log('spritebox route is being rendered');
    BlazeLayout.render('applayout', {
      main: 'spriteBoxPage'
    });
  }
});

FlowRouter.route('/beta-A', {
  name: 'beta-A',
  action() {
    console.log('beta-A route is being rendered');
    BlazeLayout.render('applayout', {
      main: 'beta1Page'
    });
  }
});