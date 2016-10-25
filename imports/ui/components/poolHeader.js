import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Colors } from '../../api/colors/colors.js';

Template.poolHeader.helpers({
  pixCounter() {
    return Counts.get('pixCount');
  },
  colorCounter() {
    return Colors.find({}).count();
  },
  rem() {
    const rem = getRootElementFontSize();
    return rem;
  }
});

Template.poolHeader.events({
  'click .deleteAllDocs'() {
    Meteor.call('eboypix.deleteAll');
  },
  'click .deleteAllColors'() {
    Meteor.call('colors.deleteAll');
  }
});

/**
 * Returns the rem of the root element.
 * @return {number} the value of the root rem element.
 */
function getRootElementFontSize() {
  // Returns a number
  return parseFloat(
    // of the computed font-size, so in px
    window.getComputedStyle(
      // for the root <html> element
      document.documentElement
    )
    .fontSize
  );
}
