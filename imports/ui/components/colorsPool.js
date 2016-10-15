import { Template } from 'meteor/templating';

import { Colors } from '../../api/colors/colors.js';

Template.colorsPool.helpers({
  colors() {
    return Colors.find({}, { sort: { hue: -1 } });
  }
});
