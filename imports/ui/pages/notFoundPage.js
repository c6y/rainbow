// Meteor stuff
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

import './notFoundPage.html';

// Template onCreated
Template.notFound.onCreated(function() {
  const self = this;
  self.autorun(function() {
    // const title = FlowRouter.getRouteName();
    DocHead.setTitle('404 · db.eboy.com');
  });
});

Template.notFound.helpers({
  toHomePath() {
    const homeRouteName = 'pool';
    const params = { slug: 'everything', page: 1 };
    return FlowRouter.path(homeRouteName, params);
  },
});
