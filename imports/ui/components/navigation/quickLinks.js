import { Template } from 'meteor/templating';

import { Quicks } from '../../../api/quicks/quicks.js';

import { getQuickUrl } from '../../../functions/client/getQuickUrl.js';

import './quickLinks.html';

// Template helpers
Template.quickLinks.helpers({
  allQuicks() {
    return Quicks.find({}, { sort: { name: 1 } });
  },
  quickUrl() {
    return getQuickUrl(this.slug, this.query);
  }
});
