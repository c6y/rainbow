import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';

import './navSearch.html';

Template.navSearch.events({
  'keyup input': _.throttle(function(event, target) {
    // Add return key below, if no live search is needed
    // if (event.keyCode === 13) {
    let searchValue = 'everything';
    if (event.target.value) {
      searchValue = event.target.value;
    }
    FlowRouter.setParams({ page: 1, slug: searchValue });
    if (event.keyCode === 13) {
      event.target.value = '';
      // event.target.blur();
    }
    // }
  }, 500),
  'blur input'(event, target) {
    // if user leaves input and does not press return
    event.target.value = '';
  }
});
