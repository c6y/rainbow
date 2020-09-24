// Meteor stuff
import { Template } from 'meteor/templating';
// import { FlowRouter } from 'meteor/kadira:flow-router';
// import { Session } from 'meteor/session';

import './pic.html';

// Components used
import './picSprite.js';
import './picSprite.html';
import './picMeta.js';
import './picMeta.html';

Template.pic.helpers({
  isAdminOrEditor() {
    if (Meteor.user()) {
      const isAdmin = Meteor.user().profile.isAdmin;
      const isEditor = Meteor.user().profile.isEditor;
      return isAdmin || isEditor;
    }
    return false;
  },
  accessLevel() {
    let value = 'Undefined';
    let style = 'access-undefined';

    if (this.access != undefined) {
      style = 'access-' + this.access.toString();
      if (this.access == 0) {
        value = 'P';
      } else if (this.access == 1) {
        value = 'LTD';
      } else if (this.access == 2) {
        value = 'Special';
      } else {
        value = 'E';
      }
    }
    return {
      value: value,
      style: style,
    };
  },
  hasLink() {
    const hasLink = this.link;
    return hasLink ? hasLink : false;
  },
});
