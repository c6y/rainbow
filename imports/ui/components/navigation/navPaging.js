// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Session } from 'meteor/session';

Template.navPaging.onCreated(function() {
  const self = this;
  self.autorun(function() {
    // subscribe to total document count
    const theSlug = FlowRouter.getParam('slug');
    const searchQuery = FlowRouter.getQueryParam('q');
    self.subscribe('pix.counts.public', theSlug, searchQuery);
  });
});

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
  const docsCount = Counts.get('totalDocsCount');
  const docsPerPage = Meteor.settings.public.navigation.pixPerPage;
  return thisPage * docsPerPage < docsCount;
};

Template.navPaging.helpers({
  // thisPageNumber() {
  //   const thisPageString = FlowRouter.getParam('page');
  //   return parseInt(thisPageString, 10);//
  // },
  previousPageClass() {
    const thisPageString = FlowRouter.getParam('page');
    const thisPage = parseInt(thisPageString, 10);
    const docsCount = Counts.get('totalDocsCount');
    const docsPerPage = Meteor.settings.public.navigation.pixPerPage;
    const pageCount = Math.max(1, Math.ceil(docsCount / docsPerPage));
    if (thisPage !== 1 && thisPage <= pageCount) {
      return 'active';
    }
    return 'inactive';
  },
  nextPageClass() {
    const thisPageString = FlowRouter.getParam('page');
    const thisPage = parseInt(thisPageString, 10);
    const docsCount = Counts.get('totalDocsCount');
    const docsPerPage = Meteor.settings.public.navigation.pixPerPage;
    const pageCount = Math.max(1, Math.ceil(docsCount / docsPerPage));
    if (thisPage < pageCount) {
      return 'active';
    }
    return 'inactive';
  },
  togglePluxChar() {
    const plusBoxShow = Session.get('plusBox');
    if (plusBoxShow) {
      return '-';
    }
    return '+';
  },
});

Template.navPaging.events({
  'click .nextPage'() {
    const thisPageString = FlowRouter.getParam('page');
    const thisPage = parseInt(thisPageString, 10);//
    const nextPage = hasMorePages() ? thisPage + 1 : thisPage;
    FlowRouter.setParams({ page: nextPage });
  },
  'click .prevPage'() {
    const thisPageString = FlowRouter.getParam('page');
    const thisPage = parseInt(thisPageString, 10);
    // return previous page, if lower than 1 return 1
    const previousPage = Math.max(1, thisPage - 1);
    FlowRouter.setParams({ page: previousPage });
  },
  'click .togglePlusBox'() {
    const oldPlusBoxShow = Session.get('plusBox');
    const newPlusBoxShow = oldPlusBoxShow === false;
    Session.set('plusBox', newPlusBoxShow);
  },
});
