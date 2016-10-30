import { Template } from 'meteor/templating';

import { Colors } from '../../../api/colors/colors.js';

// Components used
import './color.html';
import './color.js';

// Template helpers
Template.colorsPool.helpers({
  colors() {
    return Colors.find({}, { sort: { hue: -1 } });
  }
});
