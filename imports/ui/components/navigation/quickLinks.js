// Meteor stuff
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Collections
import { Quicks } from '../../../api/quicks/quicks.js';

// Functions
import { getQuickUrl } from '../../../functions/client/getQuickUrl.js';

import './quickLinks.html';

// Template helpers
Template.quickLinks.helpers({
  allQuicks() {
    return Quicks.find({}, { sort: { rank: 1, name: 1 } });
  },
  quickUrl() {
    return getQuickUrl(this.slug, this.query);
  },
  // Return true if current quickLink is active
  toHerePath() {
    // Check if slug in URL is same as quickLink
    const urlSlug = FlowRouter.getParam('slug');
    const linkSlug = this.slug;
    const isSameSlug = urlSlug === linkSlug;

    // Check if query in URL is same as quickLink
    let urlQuery = FlowRouter.getQueryParam('q');
    // If urlQuery is undefined return 'default'
    urlQuery = urlQuery === undefined ? 'default' : urlQuery;
    const linkQuery = this.query;
    const isSameQuery = urlQuery === linkQuery;

    // Check if slug and query both are the same as quickLink
    const isHere = isSameSlug & isSameQuery;

    return isHere;
  }
});
