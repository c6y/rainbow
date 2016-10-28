import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './navHere.html';

Template.navHere.helpers({
  thisRouteName() {
    return FlowRouter.getRouteName();
  },
  thisPage() {
    const page = FlowRouter.getParam('page');
    if (page) {
      return page;
    }
  },
  totalPageCount() {
    const docsCount = Counts.get('pixCount');
    const docsPerPage = Meteor.settings.public.pixPerPage;
    return Math.max(Math.ceil(docsCount / docsPerPage), 1);
  }
});
