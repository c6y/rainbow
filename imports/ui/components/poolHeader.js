import { Template } from 'meteor/templating';

import { EboyPix } from '../../api/eboypix/eboypix.js';
import { Colors } from '../../api/colors/colors.js';

Template.poolHeader.helpers({
  pixCounter() {
    return EboyPix.find({}).count();
  },
  colorCounter() {
    return Colors.find({}).count();
  }
});
