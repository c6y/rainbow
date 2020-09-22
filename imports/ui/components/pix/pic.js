// Meteor stuff
import { Template } from 'meteor/templating';
// import { FlowRouter } from 'meteor/kadira:flow-router';
// import { Session } from 'meteor/session';

// Collections
import { Colors } from '../../../api/colors/colors.js';

// Functions
import { hslColorString } from '../../../functions/client/hslColorString.js';

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
    const style = 'access-' + this.access.toString();
    let value = '0';
    if (this.access == 0) {
      value = 'P';
    } else if (this.access == 1) {
      value = 'LTD';
    } else if (this.access == 2) {
      value = 'Special';
    } else {
      value = 'E';
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
  colorHSL() {
    // Get the color by name
    const color = Colors.findOne(
        { name: this.backgroundColor },
    );
    // If it's in the color database return hsl values as css hsl string
    if (color) {
      const hslColor = hslColorString(color);
      return {
        info: hslColor,
        value: hslColor,
      };
    }
    // If color does not exist return diagonal stripes warning pattern
    const emptyColor = 'repeating-linear-gradient(' +
      '135deg,' +
      'transparent,' +
      'transparent 0.5rem,' +
      '#ccc 0.5rem,' +
      '#ccc 1rem' +
      ')';
    return {
      info: 'Warning! Assign a color!',
      value: emptyColor,
    };
  },
});
