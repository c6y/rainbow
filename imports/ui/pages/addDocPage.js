import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { DocHead } from 'meteor/kadira:dochead';
import { Session } from 'meteor/session';

import { EboyPix } from '../../api/eboypix/eboypix.js';

import './addDocPage.html';

// Components used
import '../components/pixInput.html';
import '../components/pixInput.js';
import '../components/pixList.html';
import '../components/pixList.js';
import '../components/navigation/linkStrip.html';
import '../components/navigation/linkStrip.js';
import '../components/navigation/navPageInfo.html';
import '../components/navigation/navPageInfo.js';
import '../components/navigation/pixCount.html';
import '../components/navigation/pixCount.js';
import '../components/navigation/logo.js';
import '../components/navigation/logo.html';
import '../components/navigation/sideBox.js';
import '../components/navigation/sideBox.html';

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
  },
  pix() {
    return EboyPix.find({}, { sort: { createdAt: -1 } });
  },
  docsCount() {
    const newDocsCount = EboyPix.find().count();
    return newDocsCount;
  },
  latestUploadTime() {
    return Session.get('latestUploadAt');
  },
  isAdminOrEditor() {
    if (Meteor.user()) {
      const isAdmin = Meteor.user().profile.isAdmin;
      const isEditor = Meteor.user().profile.isEditor;
      return isAdmin || isEditor;
    }
    return false;
  }
});
