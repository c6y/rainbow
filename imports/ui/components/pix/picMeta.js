import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Collections
import { Colors } from '../../../api/colors/colors.js';

// Functions
import { hslColorString } from '../../../functions/client/hslColorString.js';

import './picMeta.html';

Template.picMeta.helpers({
  toSpriteBoxPath() {
    const thisId = this._id;
    const params = { _id: thisId };
    return FlowRouter.path('spriteBox', params);
  },
  isNotSpriteBoxRoute() {
    const routeName = FlowRouter.getRouteName();
    // Returns true if we're not on spriteBox
    return routeName !== 'spriteBox';
  },
  madeDateShort() {
    const date = this.madeDate;
    if (date === undefined) {
      return '';
    }
    const shortDate = date.toISOString().substring(0, 4);
    return shortDate;
  },
  createdAtShort() {
    const date = this.createdAt;
    if (date === undefined) {
      return '';
    }
    const shortDate = date.toISOString().substring(0, 10);
    return shortDate;
  },
  uploadedByName() {
    if (this.uploadedBy) {
      // const uploadedBy = this.uploadedBy.username;
      const uploadedBy = this.uploadedBy.username;
      return uploadedBy;
    }
  },
  colorHSL() {
    // return this.backgroundColor;

    // Get the color by name
    const color = Colors.findOne(
        { name: this.backgroundColor },
    );
    // If it's in the color database return hsl values as css hsl string
    if (color) {
      const hslColor = hslColorString(color);
      return hslColor;
    } else {
      return 'n\/a';
    }
  },
  isAdminOrEditor() {
    if (Meteor.user()) {
      const isAdmin = Meteor.user().profile.isAdmin;
      const isEditor = Meteor.user().profile.isEditor;
      return isAdmin || isEditor;
    }
    return false;
  },
});
