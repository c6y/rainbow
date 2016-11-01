import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';
import { Session } from 'meteor/session';

import './addDocPage.html';

// Components used
import '../components/pixInput.html';
import '../components/pixInput.js';
import '../components/pixPoolLatest.html';
import '../components/pixPoolLatest.js';
import '../components/navigation/navLinks.html';
import '../components/navigation/navLinks.js';
import '../components/navigation/navPageInfo.html';
import '../components/navigation/navPageInfo.js';

import '../components/pixCount.html';
import '../components/pixCount.js';

// Template onCreated
Template.addDocPage.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const title = FlowRouter.getRouteName();
    DocHead.setTitle(title);

    if (Session.get('latestUploadAt')) {
      let lastUpload = Session.get('latestUploadAt');
      self.subscribe('pix.afterDate.public', lastUpload);
      self.subscribe('colors.public');
    }
  });
});

Template.addDocPage.helpers({
  showInsertErrors() {
    const failedURLs = Session.get('insertErrors');
    return failedURLs;
  },
  insertErrorsCount() {
    const failedURLs = Session.get('insertErrors');
    return failedURLs.length;
  }
});