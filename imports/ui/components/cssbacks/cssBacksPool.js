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
