import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import layouts
import '../../ui/layouts/applayout.js';

// Import pages
import '../../ui/pages/pixPoolPage.js';
import '../../ui/pages/colorsPoolPage.js';
import '../../ui/pages/spriteBoxPage.js';
import '../../ui/pages/addDocPage.js';
import '../../ui/pages/beta1Page.js';
import '../../ui/pages/pixListPage.js';

FlowRouter.route('/pool/:slug/:page', {
  name: 'pool',
  action() {
    BlazeLayout.render('applayout', {
      main: 'pixPoolPage'
    });
  }
});

FlowRouter.route('/list/:page', {
  name: 'list',
  action() {
    BlazeLayout.render('applayout', {
      main: 'pixListPage'
    });
  }
});

FlowRouter.route('/colors', {
  name: 'colors',
  action() {
    BlazeLayout.render('applayout', {
      main: 'colorsPoolPage'
    });
  }
});

FlowRouter.route('/spritebox/:_id', {
  name: 'spriteBox',
  action() {
    BlazeLayout.render('applayout', {
      main: 'spriteBoxPage'
    });
  }
});

FlowRouter.route('/addDoc', {
  name: 'addDoc',
  action() {
    BlazeLayout.render('applayout', {
      main: 'addDocPage'
    });
  }
});

FlowRouter.route('/beta-A', {
  name: 'beta-A',
  action() {
    BlazeLayout.render('applayout', {
      main: 'beta1Page'
    });
  }
});
