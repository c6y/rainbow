import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './navLinks.html';

Template.navLinks.helpers({
  toPoolPath() {
    const thisRouteName = FlowRouter.getRouteName();
    if (thisRouteName !== 'pool') {
      return FlowRouter.path('pool', { slug: 'everything', page: '1' });
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
  toListPath() {
    const thisRouteName = FlowRouter.getRouteName();
    if (thisRouteName !== 'list') {
      return FlowRouter.path('list', { slug: 'everything', page: '1' });
    }
  },
  thisIsHere() {
    return FlowRouter.getRouteName();
  }
});
