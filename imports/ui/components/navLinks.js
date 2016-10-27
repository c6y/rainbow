import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './navLinks.html';

Template.navLinks.helpers({
  toAddDocsPath() {
    return FlowRouter.path('addDoc');
  },
  toColorsPath() {
    return FlowRouter.path('colors');
  }
});
