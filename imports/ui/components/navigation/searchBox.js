import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Session } from 'meteor/session';

import './searchBox.html';

// Template onCreated
Template.searchBox.onCreated(function() {
  // Set initial value of query to default if undefined
  if (Session.get('searchBoxQuery') === undefined) {
    console.log('it is undefined');
    Session.set('searchBoxQuery', 'default');
    // Just to be sure, remove any query remains from URL
    FlowRouter.setQueryParams({ q: null });
  }
  // const sessionQuery = Session.get('searchBoxQuery');
  // console.log('sessionQuery: ' + sessionQuery);
});

Template.searchBox.helpers({
  queryList() {
    const defaultSel = 'selected';
    const tagSel = '';
    const projectSel = '';
    const nameSel = '';
    return [
      { value: 'default', label: 'anywhere', selected: tagSel },
      { value: 'tag', label: 'tag', selected: tagSel },
      { value: 'project', label: 'project', selected: tagSel },
      { value: 'name', label: 'name', selected: tagSel }
    ];
  },
  // searchPlaceholder() {
  //   const query = FlowRouter.getQueryParam('q');
  //   // return query === 'name' ? 'name search' : 'search';
  //   if (query === 'name') {
  //     return 'name search';
  //   } else if (query === 'project') {
  //     return 'project search';
  //   } else if (query === 'tag') {
  //     return 'tag search';
  //   }
  //   return 'search';
  // },
  // searchPlaceholder() {
  //   // const query = FlowRouter.getQueryParam('q');
  //   const slug = FlowRouter.getParam('slug');
  //   return slug;
  // },
  searchPlaceholder() {
    // const query = FlowRouter.getQueryParam('q');
    const slug = FlowRouter.getParam('slug');
    return slug;
  },
  isAdminOrEditor() {
    if (Meteor.user()) {
      const isAdmin = Meteor.user().profile.isAdmin;
      const isEditor = Meteor.user().profile.isEditor;
      return isAdmin || isEditor;
    }
    return false;
  },
});

Template.searchBox.events({
  'change select': function(event, template) {
    const theQuery = event.target.value;
    console.log('theQuery: ' + theQuery);
    Session.set('searchBoxQuery', theQuery);
    if (theQuery === 'default') {
      FlowRouter.setQueryParams({ q: null });
    } else {
      FlowRouter.setQueryParams({ q: theQuery });
    }
  },
  'submit': function(event, template) {
    event.preventDefault();
    // const slug = event.target.slug.value;
    // Session.set('placeholder', slug);
  },
  'keyup input': _.throttle(function(event, target) {
    event.preventDefault();
    // Add return key below, if no live search is needed
    // if (event.keyCode === 13) {
    let searchValue = 'everything';

    let query = Session.get('searchBoxQuery');
    query = query === 'default' ? null : query;
    console.log('query: ' + query);

    if (event.target.value) {
      searchValue = event.target.value;
    }
    FlowRouter.setParams({ page: 1, slug: searchValue });
    FlowRouter.setQueryParams({ q: query });
    if (event.keyCode === 13) {
      event.target.value = '';
      event.target.blur();
    }
    // }
  }, 600)
  // 'blur input'(event, target) {
  //   // if user leaves input and does not press return
  //   event.target.value = '';
  //   // // Reset to global search if not a logged in user
  //   // if (!Meteor.user()) {
  //   //   FlowRouter.setQueryParams({ q: null });
  //   // }
  // }
});
