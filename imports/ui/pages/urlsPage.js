// Meteor stuff
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';

// Collections
import { EboyPix } from '../../api/eboypix/eboypix.js';

import './urlsPage.html';

// Template onCreated
Template.urlsPage.onCreated(function() {
  const self = this;
  // const projectname = 'gfsub'; // //
  self.autorun(function() {
    const title = FlowRouter.getRouteName();
    const thisSlug = FlowRouter.getParam('slug');

    DocHead.setTitle(title + '/' + thisSlug);
    self.subscribe('pix.urls.public', thisSlug);
  });
});

Template.urlsPage.helpers({
  projectURLs() {
    const selector = {};
    const options = { sort: { createdAt: -1 } };
    return EboyPix.find(selector, options);
  }
});
