// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Counts } from 'meteor/tmeasday:publish-counts';

// Components
import './pixCount.html';
import './pixCount.js';

import './navPageInfo.html';

Template.navPageInfo.helpers({
  thisQuery() {
    const query = FlowRouter.getQueryParam('q');
    if (query === 'tag') {
      return 't';
    } else if (query === 'project') {
      return 'p';
    } else if (query === 'name') {
      return 'n';
    }
    return query;
  },
  thisRouteSlug() {
    const slug = FlowRouter.getParam('slug');
    return slug === 'everything' ? false : slug;
  },
  thisPage() {
    const page = FlowRouter.getParam('page');
    if (page) {
      return page;
    }
  },
  totalPageCount() {
    const docsCount = Counts.get('totalDocsCount');
    const docsPerPage = Meteor.settings.public.navigation.pixPerPage;
    return Math.max(Math.ceil(docsCount / docsPerPage), 1);
  }
});
