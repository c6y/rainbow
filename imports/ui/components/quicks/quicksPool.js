import { Template } from 'meteor/templating';

import { Quicks } from '../../../api/quicks/quicks.js';

import './quicksPool.html';

// Components used
import './quick.html';
import './quick.js';

// Template helpers
Template.quicksPool.helpers({
  quicks() {
    return Quicks.find({}, { sort: { name: 1 } });
  }
});
