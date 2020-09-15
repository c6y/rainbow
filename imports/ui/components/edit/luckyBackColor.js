// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// Collections
import { Colors } from '../../../api/colors/colors.js';

import './luckyBackColor.html';

Template.luckyBackColor.events({
  // Change background color to random color
  'click .rndColor'() {
    const arrayColors = Colors.find().fetch();
    const randomIndex = Math.floor(Math.random() * arrayColors.length);
    const randomColorName = arrayColors[randomIndex].name;
    Meteor.call('eboypix.updateBackColor', this._id, randomColorName);
  },
});
