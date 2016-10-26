import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Counts } from 'meteor/tmeasday:publish-counts';

/**
 * Returns the next page if it has documents
 * @param {string} page The current page.
 * @param {number} docsCount Total # of documents.
 * @return {integer} Either the number of the next page
 * or the number of the current page.
 */
const hasMorePages = function() {
  const thisPageString = FlowRouter.getParam('page');
  const thisPage = parseInt(thisPageString, 10);
  const docsCount = Counts.get('pixCount');
  const docsPerPage = Meteor.settings.public.pixPerPage;
  return thisPage * docsPerPage < docsCount;
};

Template.paging.helpers({
  thisPageNumber() {
    const thisPageString = FlowRouter.getParam('page');
    return parseInt(thisPageString, 10);//
  },
  totalPageCount() {
    const docsCount = Counts.get('pixCount');
    const docsPerPage = Meteor.settings.public.pixPerPage;
    return Math.max(Math.ceil(docsCount / docsPerPage), 1);
  },
  previousPageClass() {
    const thisPageString = FlowRouter.getParam('page');
    if (parseInt(thisPageString, 10) !== 1) {
      return 'active';
    }
    return 'inactive';
  },
  nextPageClass() {
    const thisPageString = FlowRouter.getParam('page');
    const docsCount = Counts.get('pixCount');
    const docsPerPage = Meteor.settings.public.pixPerPage;
    const pageCount = Math.ceil(docsCount / docsPerPage);
    if (parseInt(thisPageString, 10) !== pageCount) {
      return 'active';
    }
    return 'inactive';
  }
});

Template.paging.events({
  'click .nextPage'() {
    const thisPageString = FlowRouter.getParam('page');
    const thisPage = parseInt(thisPageString, 10);//
    const nextPage = hasMorePages() ? thisPage + 1 : thisPage;
    FlowRouter.setParams({ page: nextPage });
  },
  'click .prevPage'() {
    const thisPageString = FlowRouter.getParam('page');
    let thisPage = parseInt(thisPageString, 10);
    // return previous page, if lower than 1 return 1
    const previousPage = Math.max(1, thisPage - 1);
    FlowRouter.setParams({ page: previousPage });
  }
});
