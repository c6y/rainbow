import { Template } from 'meteor/templating';

import { Colors } from '../../../api/colors/colors.js';

Template.countColors.helpers({
  colorCounter() {
    return Colors.find({}).count();
  }
});
