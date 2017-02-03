// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

// Functions
import { isHome } from '../../../functions/client/isHome.js';

import './logo.html';

Template.logo.helpers({
  toHomePath() {
    if (!isHome()) {
      return FlowRouter.path('pool', { slug: 'showfoo', page: 1 });
    }
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
