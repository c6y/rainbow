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
  searchNameSwitch() {
    const query = FlowRouter.getQueryParam('q');
    return query === 'name' ? '\\' : '/';
  },
  isTagSearch() {
    return FlowRouter.getQueryParam('q') === 'tag';
  },
  isProjectSearch() {
    return FlowRouter.getQueryParam('q') === 'project';
  },
  isNameSearch() {
    return FlowRouter.getQueryParam('q') === 'name';
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
      // event.target.blur();
    }
    // }
  }, 500),
  'blur input'(event, target) {
    // if user leaves input and does not press return
    event.target.value = '';
  },
  'click .toggleNameSearch'() {
    const oldSearchQuery = FlowRouter.getQueryParam('q');
    const newSearchQuery = oldSearchQuery === 'name' ? null : 'name';
    FlowRouter.setQueryParams({ q: newSearchQuery });
  },
  'click .toggleProjectSearch'() {
    const oldSearchQuery = FlowRouter.getQueryParam('q');
    const newSearchQuery = oldSearchQuery === 'project' ? null : 'project';
    FlowRouter.setQueryParams({ q: newSearchQuery });
  },
  'click .toggleTagSearch'() {
    const oldSearchQuery = FlowRouter.getQueryParam('q');
    const newSearchQuery = oldSearchQuery === 'tag' ? null : 'tag';
    FlowRouter.setQueryParams({ q: newSearchQuery });
  }
});
