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
