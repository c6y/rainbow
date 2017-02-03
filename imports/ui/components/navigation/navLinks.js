// Meteor stuff
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './navLinks.html';

Template.navLinks.helpers({
  toPoolPath() {
    const thisRouteName = FlowRouter.getRouteName();
    if (thisRouteName !== 'pool') {
      let thisPage = 1;
      let thisSlug = 'everything';
      let thisQuery = null;
      if (thisRouteName === 'edit') {
        thisSlug = FlowRouter.getParam('slug');
        thisPage = FlowRouter.getParam('page');
        thisQuery = { q: FlowRouter.getQueryParam('q') };
      }
      return FlowRouter.path(
        'pool',
        { slug: thisSlug, page: thisPage },
        thisQuery
      );
    }
  },
  toAddDocsPath() {
    const thisRouteName = FlowRouter.getRouteName();
    if (thisRouteName !== 'addDoc') {
      return FlowRouter.path('addDoc');
    }
  },
  toColorsPath() {
    const thisRouteName = FlowRouter.getRouteName();
    if (thisRouteName !== 'colors') {
      return FlowRouter.path('colors');
    }
  },
  toEditorPath() {
    const thisRouteName = FlowRouter.getRouteName();
    if (thisRouteName !== 'edit') {
      let thisPage = 1;
      let thisSlug = 'everything';
      let thisQuery = null;
      if (thisRouteName === 'pool') {
        thisSlug = FlowRouter.getParam('slug');
        thisPage = FlowRouter.getParam('page');
        thisQuery = FlowRouter.getQueryParam('q');
      }
      return FlowRouter.path(
        'edit',
        { slug: thisSlug, page: thisPage },
        { q: thisQuery }
      );
    }
  },
  toDashboardPath() {
    const thisRouteName = FlowRouter.getRouteName();
    if (thisRouteName !== 'dashboard') {
      return FlowRouter.path('dashboard');
    }
  },
  toQuicksPath() {
    const thisRouteName = FlowRouter.getRouteName();
    if (thisRouteName !== 'quicks') {
      return FlowRouter.path('quicks');
    }
  },
  thisIsHere() {
    return FlowRouter.getRouteName();
  }
});
