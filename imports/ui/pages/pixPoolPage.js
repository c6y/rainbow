import { Template } from 'meteor/templating';
// import { FlowRouter } from 'meteor/kadira:flow-router';

import './pixPoolPage.html';

Template.pixPoolPage.helpers({
  test() {
    console.log('this is the pixPoolPage');
  }
});
