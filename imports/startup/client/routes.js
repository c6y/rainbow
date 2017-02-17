// Meteor stuff
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { GAnalytics } from 'meteor/datariot:ganalytics';
import { Meteor } from 'meteor/meteor';

// Layouts
import '../../ui/layouts/applayout.js';

// Pages
import '../../ui/pages/pixPoolPage.js';
import '../../ui/pages/colorsPage.js';
import '../../ui/pages/quicksPage.js';
import '../../ui/pages/spriteBoxPage.js';
import '../../ui/pages/addDocPage.js';
import '../../ui/pages/pixEditPage.js';
import '../../ui/pages/dashboardPage.js';
import '../../ui/pages/notFoundPage.js';

const slugHome = Meteor.settings.public.slugHome;

// Redirects
FlowRouter.route('/', {
  triggersEnter: [function(context, redirect) {
    redirect('/pool/' + slugHome + '/1');
  }]
});

FlowRouter.route('/pool/', {
  triggersEnter: [function(context, redirect) {
    redirect('/pool/' + slugHome + '/1');
  }]
});

FlowRouter.route('/pool/:slug/', {
  triggersEnter: [function(context, redirect) {
    redirect('/pool/' + slugHome + '/1');
  }]
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('applayout', {
      main: 'notFound'
    });
  }
};

FlowRouter.route('/pool/:slug/:page', {
  name: 'pool',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('applayout', {
      main: 'pixPoolPage'
    });
  }
});

FlowRouter.route('/edit/:slug/:page', {
  name: 'edit',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('applayout', {
      main: 'pixEditPage'
    });
  }
});

FlowRouter.route('/colors', {
  name: 'colors',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('applayout', {
      main: 'colorsPage'
    });
  }
});

FlowRouter.route('/spritebox/:_id', {
  name: 'spriteBox',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('applayout', {
      main: 'spriteBoxPage'
    });
  }
});

FlowRouter.route('/addDoc', {
  name: 'addDoc',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('applayout', {
      main: 'addDocPage'
    });
  }
});

FlowRouter.route('/dashboard', {
  name: 'dashboard',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('applayout', {
      main: 'dashboardPage'
    });
  }
});

FlowRouter.route('/quicks', {
  name: 'quicks',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('applayout', {
      main: 'quicksPage'
    });
  }
});
