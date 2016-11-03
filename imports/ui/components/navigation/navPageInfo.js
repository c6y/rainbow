import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './navPageInfo.html';

// This seems to mess up counting if there's
// the same subscription on navPaging
// Template.navPageInfo.onCreated(function() {
  // const self = this;
  // const theSlug = FlowRouter.getParam('slug');
  // console.log('navPageInfo: theSlug: ' + theSlug);
  // self.autorun(function() {
  //   self.subscribe('pix.counts.public', theSlug);
  // });
// });

Template.navPageInfo.helpers({
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
    const docsCount = Counts.get('totalDocsCount');
    const docsPerPage = Meteor.settings.public.pixPerPage;
    return Math.max(Math.ceil(docsCount / docsPerPage), 1);
  }
});
