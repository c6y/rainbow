// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
// import { DocHead } from 'meteor/kadira:dochead';
import { Session } from 'meteor/session';

// Functions
import { setDocHead } from '../../functions/client/setDocHead.js';

// Collections
import { EboyPix } from '../../api/eboypix/eboypix.js';

import './spriteBoxPage.html';

// Components used
import '../components/pix/picSpriteZoom.js';
import '../components/pix/picSpriteZoom.html';
import '../components/pix/picMeta.js';
import '../components/pix/picMeta.html';

// Template onCreated
Template.spriteBoxPage.onCreated(function() {
  this.metaShow = new ReactiveVar(false);
  const self = this;
  self.autorun(function() {
    setDocHead();

    const thisId = FlowRouter.getParam('_id');
    self.subscribe('pix.single.public', thisId);
    self.subscribe('colors.public');
  });
});

// Template helpers
Template.spriteBoxPage.helpers({
  spriteDoc() {
    // Get single document by id
    const thisId = FlowRouter.getParam('_id');
    const pixDoc = EboyPix.findOne(thisId);
    return pixDoc;
  },
  isVisible() {
    return Template.instance().metaShow.get();
  },
  copyright() {
    return Meteor.settings.public.ownership.copyright;
  },
  madeDateShort() {
    const date = this.madeDate;
    if (date === undefined) {
      return '';
    }
    const shortDate = date.toISOString().substring(0, 4);
    return shortDate;
  }
});

Template.spriteBoxPage.events({
  // Toggle metadata
  'click .copyright'() {
    const oldShowingMeta = Template.instance().metaShow.get();
    const newShowingMeta = oldShowingMeta === false;
    Template.instance().metaShow.set(newShowingMeta);
  },
  // Go back to the originating search page
  'click .spriteBox'() {
    let lastRoute = Session.get('lastRoute');
    let lastSlug = Session.get('lastSlug');
    let lastPage = Session.get('lastPage');
    let lastQuery = Session.get('lastQuery');

    if (lastRoute === undefined) {
      lastRoute = 'pool';
    }
    lastRoute = lastRoute === undefined ? 'pool' : lastRoute;
    lastSlug = lastSlug === undefined ? 'everything' : lastSlug;
    lastPage = lastPage === undefined ? 1 : lastPage;

    FlowRouter.go(
      lastRoute,
      {
        slug: lastSlug,
        page: lastPage
      },
      {
        q: lastQuery
      }
    );
  }
});
