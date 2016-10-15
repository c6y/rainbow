import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { EboyPix } from '../api/eboypix/eboypix.js';
import { Colors } from '../api/colors/colors.js';

import './body.html';
import './components/pic.html';
import './components/pic.js';
import './components/color.html';
import './components/color.js';
import './components/colorInput.html';
import './components/colorInput.js';
import './components/pixInput.html';
import './components/pixInput.js';
import './components/poolHeader.html';
import './components/poolHeader.js';

Template.body.helpers({
  pix() {
    return EboyPix.find({}, { sort: { createdAt: -1 } });
  },
  colors() {
    return Colors.find({}, { sort: { hue: -1 } });
  }
});

Template.body.events({
  'click .deleteAllDocs'() {
    Meteor.call('eboypix.deleteAll');
  },
  'click .deleteAllColors'() {
    Meteor.call('colors.deleteAll');
  }
});
