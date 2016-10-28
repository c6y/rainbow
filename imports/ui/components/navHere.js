import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './navHere.html';

Template.navHere.helpers({
  thisRouteName() {
    return 'eboy/' + FlowRouter.getRouteName();
  }
});
