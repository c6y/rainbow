// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './pageCount.html';

Template.pageCount.helpers({
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
