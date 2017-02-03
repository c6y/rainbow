// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';

import './navSearch.html';

Template.navSearch.helpers({
  searchPlaceholder() {
    const query = FlowRouter.getQueryParam('q');
    // return query === 'name' ? 'name search' : 'search';
    if (query === 'name') {
      return 'name search';
    } else if (query === 'project') {
      return 'project search';
    } else if (query === 'tag') {
      return 'tag search';
    }
    return 'search';
  },
  isAdminOrEditor() {
    if (Meteor.user()) {
      const isAdmin = Meteor.user().profile.isAdmin;
      const isEditor = Meteor.user().profile.isEditor;
      return isAdmin || isEditor;
    }
    return false;
  }
});

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
      event.target.blur();
    }
    // }
  }, 600),
  'blur input'(event, target) {
    // if user leaves input and does not press return
    event.target.value = '';
    // // Reset to global search if not a logged in user
    // if (!Meteor.user()) {
    //   FlowRouter.setQueryParams({ q: null });
    // }
  },
  // To keep search simple:
  // Reset to global search if not a logged in user
  // 'focus input'(event, target) {
  //   if (!Meteor.user()) {
  //     const query = FlowRouter.getQueryParam('q');
  //     if (query !== null) {
  //       FlowRouter.setQueryParams({ q: null });
  //     }
  //   }
  // },
  'click .switchToNext'() {
    // switch through different search options
    const oldSearchQuery = FlowRouter.getQueryParam('q');
    if (!oldSearchQuery) {
      FlowRouter.setQueryParams({ q: 'tag' });
      FlowRouter.setParams({ page: 1 });
    } else if (oldSearchQuery === 'tag') {
      FlowRouter.setQueryParams({ q: 'project' });
      FlowRouter.setParams({ page: 1 });
    } else if (oldSearchQuery === 'project') {
      FlowRouter.setQueryParams({ q: 'name' });
      FlowRouter.setParams({ page: 1 });
    } else {
      FlowRouter.setQueryParams({ q: null });
      FlowRouter.setParams({ page: 1 });
    }
  }
});
