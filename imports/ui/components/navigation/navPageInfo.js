import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './navPageInfo.html';

Template.navPageInfo.helpers({
  isNameSearch() {
    const query = FlowRouter.getQueryParam('q');
    return query === 'name';
  },
  thisRouteSlug() {
    return FlowRouter.getParam('slug');
  },
  thisPage() {
    const page = FlowRouter.getParam('page');
    if (page) {
      return page;
    }
  },
  totalPageCount() {
    const docsCount = Counts.get('totalDocsCount');
    const docsPerPage = Meteor.settings.public.pixPerPage;
    return Math.max(Math.ceil(docsCount / docsPerPage), 1);
  }
});
