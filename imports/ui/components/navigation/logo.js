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
      const slugHome = Meteor.settings.public.navigation.slugHome;
      return FlowRouter.path('pool', { slug: slugHome, page: 1 });
    }
  },
  logotext() {
    return Meteor.settings.public.ownership.creator.name;
  },
  isActive() {
    const oldPlusBoxShow = Session.get('plusBox');
    if (oldPlusBoxShow) {
      return true;
    }
    return false;
  }
});

Template.logo.events({
  'click #togglePlusBox'() {
    const oldPlusBoxShow = Session.get('plusBox');
    const newPlusBoxShow = oldPlusBoxShow === false;
    Session.set('plusBox', newPlusBoxShow);
  }
});
