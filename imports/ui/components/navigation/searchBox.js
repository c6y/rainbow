// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Session } from 'meteor/session';

// Components
import './pixCount.html';
import './pixCount.js';
import './pageCount.html';
import './pageCount.js';

import './searchBox.html';

// Template onCreated
Template.searchBox.onCreated(function() {
  // Check path if it has a query,
  // ... if so set the Session variable
  const query = FlowRouter.getQueryParam('q');
  if (query) {
    console.log('query: ' + query);
    Session.set('searchBoxQuery', query);
  }
  // Set initial value of query to default if undefined
  if (Session.get('searchBoxQuery') === undefined) {
    // console.log('it is undefined');
    Session.set('searchBoxQuery', 'default');
    // Just to be sure, remove any query remains from URL
    FlowRouter.setQueryParams({ q: null });
  }
});

Template.searchBox.helpers({
  // Reactive selected property in dropdown menu
  queryList() {
    const query = FlowRouter.getQueryParam('q');
    let selectDefault = 'selected';
    let selectTag = '';
    let selectProject = '';
    let selectName = '';
    if (query === undefined) {
      selectDefault = 'selected';
    } else {
      selectDefault = '';
    }
    if (query === 'tag') {
      selectTag = 'selected';
    } else {
      selectTag = '';
    }
    if (query === 'project') {
      selectProject = 'selected';
    } else {
      selectProject = '';
    }
    if (query === 'name') {
      selectName = 'selected';
    } else {
      selectName = '';
    }
    return [
      { value: 'default', label: 'anywhere', selected: selectDefault },
      { value: 'tag', label: 'tag', selected: selectTag },
      { value: 'project', label: 'project', selected: selectProject },
      { value: 'name', label: 'name', selected: selectName },
    ];
  },
  searchPlaceholder() {
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
  // Hide or show search field dropdown menu
  // isUser() {
  //   if (Meteor.user()) {
  //     return 'true';
  //   }
  //   return 'false';
  // },
  // isVisible() {
  //   const isVisible = Session.get('plusBox');
  //   return isVisible;
  // },
  searchSliderCSS() {
    const isVisible = Session.get('plusBox');
    if (isVisible) {
      return 'searchShow';
    }
    return 'searchHide';
  },
  onPoolAndEdit() {
    const isPool = FlowRouter.getRouteName() === 'pool';
    const isEdit = FlowRouter.getRouteName() === 'edit';
    if (isPool | isEdit) {
      return true;
    }
  },
});

Template.searchBox.events({
  'change select': function(event, template) {
    const theQuery = event.target.value;
    // console.log('theQuery: ' + theQuery);
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

    // Remove query if Session variable
    // is set to 'default' in 'searchBoxQuery'
    let query = Session.get('searchBoxQuery');
    query = query === 'default' ? null : query;

    // Remove query and seach globally if user is not logged in
    // This will ensure that these users get global search
    // .. even if they start with an url that contained a query
    if (!Meteor.user()) {
      query = null;
    }

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
  }, 600),
  'blur input'(event, target) {
    // if user leaves input and does not press return
    event.target.value = '';
  },
});
