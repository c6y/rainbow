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

Template.body.helpers({
  pix() {
    return EboyPix.find({}, { sort: { createdAt: -1 } });
  },
  pixCounter() {
    return EboyPix.find({}).count();
  },
  colors() {
    return Colors.find({}, { sort: { hue: -1 } });
  },
  colorCounter() {
    return Colors.find({}).count();
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
