import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './quick.html';

Template.quick.helpers({
  quickUrl() {
    const slug = this.slug;
    let query = this.query;
    query = query === 'default' ? undefined : query;
    const params = { slug: slug, page: 1 };
    const queryParams = { q: query };
    const url = FlowRouter.path('pool', params, queryParams);
    return url;
  }
});

// Template events
Template.quick.events({
  'click .quickDelete'() {
    Meteor.call('quick.delete', this._id);
  }
});
