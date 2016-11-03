import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './navSearch.html';

Template.navSearch.events({
  'keyup input'(event, target) {
    if (event.keyCode === 13) { // return key submits search term
      const searchValue = event.target.value;
      console.log(searchValue);
      FlowRouter.setParams({ page: 1, slug: searchValue });
    }
  }
});
