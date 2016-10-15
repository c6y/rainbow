import { Template } from 'meteor/templating';

import { EboyPix } from '../api/eboypix/eboypix.js';

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
import './components/colorsPool.html';
import './components/colorsPool.js';

Template.body.helpers({
  pix() {
    return EboyPix.find({}, { sort: { createdAt: -1 } });
  }
});
