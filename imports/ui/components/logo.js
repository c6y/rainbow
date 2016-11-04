import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './logo.html';

Template.logo.helpers({
  toHomePath() {
    // Return path to home, if not on pool, page 1
    const isPool = FlowRouter.getRouteName() === 'pool';
    if (isPool && FlowRouter.getParam('page') === '1') {
      return false;
    }
    return FlowRouter.path('pool', { slug: 'everything', page: 1 });
  }
});
