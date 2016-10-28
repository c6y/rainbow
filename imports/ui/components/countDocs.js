import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';

import './countDocs.html';

Template.countDocs.helpers({
  pixCounter() {
    return Counts.get('pixCount');
  }
});
