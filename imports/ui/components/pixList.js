import { Template } from 'meteor/templating';
import { EboyPix } from '../../api/eboypix/eboypix.js';

// Components used
import './picOnList.html';
import './picOnList.js';

// Template helpers
Template.pixList.helpers({
  pix() {
    return EboyPix.find({}, { sort: { createdAt: -1 } });
  }
});
