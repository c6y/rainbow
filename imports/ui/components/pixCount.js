import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';
// import { FlowRouter } from 'meteor/kadira:flow-router';

import './pixCount.html';

// This seems to mess up counting if there's
// the same subscription on navPaging
// Template.pixCount.onCreated(function() {
  // const self = this;
  // const theSlug = FlowRouter.getParam('slug');
  // console.log('pixCount: theSlug: ' + theSlug);
  // self.autorun(function() {
  //   self.subscribe('pix.counts.public', theSlug);
  // });
// });

Template.pixCount.helpers({
  pixCounter() {
    return Counts.get('totalDocsCount');
  }
});
