import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

import './logo.html';

Template.logo.helpers({
  toHomePath() {
    const isPool = FlowRouter.getRouteName() === 'pool';
    const isPageOne = FlowRouter.getParam('page') === '1';
    const isSlugEverything = FlowRouter.getParam('slug') === 'portfolio';
    const query = FlowRouter.getQueryParam('q');
    let hadProjectQuery = false;
    if (query === 'project') {
      hadProjectQuery = true;
    }
    if (isPool && isPageOne && isSlugEverything && hadProjectQuery) {
      return false;
    }
    return FlowRouter.path('pool', { slug: 'portfolio', page: 1 }, { q: 'project' });
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
