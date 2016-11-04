import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './navLinks.html';

Template.navLinks.helpers({
  toPoolPath() {
    const thisRouteName = FlowRouter.getRouteName();
    if (thisRouteName !== 'pool') {
      let thisPage = 1;
      if (thisRouteName === 'editor') {
        thisPage = FlowRouter.getParam('page');
      }
      return FlowRouter.path('pool', { slug: 'everything', page: thisPage });
    }
  },
  toAddDocsPath() {
    const thisRouteName = FlowRouter.getRouteName();
    if (thisRouteName !== 'addDoc') {
      return FlowRouter.path('addDoc');
    }
  },
  toColorsPath() {
    const thisRouteName = FlowRouter.getRouteName();
    if (thisRouteName !== 'colors') {
      return FlowRouter.path('colors');
    }
  },
  toEditorPath() {
    const thisRouteName = FlowRouter.getRouteName();
    if (thisRouteName !== 'editor') {
      let thisPage = 1;
      if (thisRouteName === 'pool') {
        thisPage = FlowRouter.getParam('page');
      }
      return FlowRouter.path('editor', { slug: 'everything', page: thisPage });
    }
  },
  thisIsHere() {
    return FlowRouter.getRouteName();
  }
});
