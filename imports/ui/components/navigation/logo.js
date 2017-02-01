import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

import './logo.html';

Template.logo.helpers({
  toHomePath() {
    const isPool = FlowRouter.getRouteName() === 'pool';
    const isPageOne = FlowRouter.getParam('page') === '1';
    const isSlugEverything = FlowRouter.getParam('slug') === 'showfoo';
    const query = FlowRouter.getQueryParam('q');
    let hasNoQuery = false;
    if (query === undefined) {
      hasNoQuery = true;
    }
    if (isPool && isPageOne && isSlugEverything && hasNoQuery) {
      return false;
    }
    return FlowRouter.path('pool', { slug: 'showfoo', page: 1 });
  },
  logotext() {
    return Meteor.settings.public.logotext;
  },
  isActive() {
    const oldPlusBoxShow = Session.get('plusBox');
    if (oldPlusBoxShow) {
      return 'active';
    }
    return 'inactive';
  },
  isActiveChar() {
    const oldPlusBoxShow = Session.get('plusBox');
    if (oldPlusBoxShow) {
      return '×';
    }
    return '+';
  }
});

Template.logo.events({
  'click .togglePlusBox'() {
    const oldPlusBoxShow = Session.get('plusBox');
    const newPlusBoxShow = oldPlusBoxShow === false;
    Session.set('plusBox', newPlusBoxShow);
  }
});
