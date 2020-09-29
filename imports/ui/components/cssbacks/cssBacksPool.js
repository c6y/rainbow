import { Template } from 'meteor/templating';

import { CssBacks } from '../../../api/cssbacks/cssbacks.js';

import './cssBacksPool.html';

// Components used
import './cssBack.html';
import './cssBack.js';

// Template helpers
Template.cssBacksPool.helpers({
  cssBacks() {
    return CssBacks.find({}, { sort: { name: -1 } });
  },
});

// Template events
Template.cssBacksPool.events({
  // Session is initialized in cssBackInput.js
  'click #cssBack'(event) {
    Session.set('backgroundCss', this.code);
    Session.set('backgroundName', this.name);
  },
});
