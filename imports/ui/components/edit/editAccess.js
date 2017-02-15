// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editAccess.html';

// Template helpers
Template.editAccess.helpers({
  // Return CSS and readable label
  // depending on access level
  access() {
    let state = this.access;
    let label = '3:editor:black';
    let css = 'access0';

    if (state === 0) {
      label = '0:public';
      css = 'access0';
    } else if (state === 1) {
      label = '1:limited';
      css = 'access1';
    } else if (state === 2) {
      label = '2:special';
      css = 'access2';
    } else if (state === 3) {
      label = '3:editor';
      css = 'access3';
    } else {
      label = 'UNDEFINED';
      css = 'access3';
    }
    return {
      label: label,
      css: css
    };
  }
});

Template.editAccess.events({
  // Step-circulate through 0 to 3
  'click .stepAccess'(event, target) {
    let oldState = 0;
    if (this.access) {
      oldState = this.access;
    }
    const newState = oldState + 1;
    const remainder = newState % 4;
    Meteor.call('eboypix.updateAccess', this._id, remainder);
  }
});
