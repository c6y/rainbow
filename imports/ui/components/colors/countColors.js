import { Template } from 'meteor/templating';

import { Colors } from '../../../api/colors/colors.js';

import './countColors.html';

Template.countColors.helpers({
  colorCounter() {
    return Colors.find({}).count();
  }
});
