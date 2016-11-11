import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './notFoundPage.html';

Template.notFound.helpers({
  toHomePath() {
    const homeRouteName = 'pool';
    const params = { slug: 'everything', page: 1 };
    return FlowRouter.path(homeRouteName, params);
  }
});
