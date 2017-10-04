import { Template } from 'meteor/templating';

import { Devices } from '../../../api/devices/devices.js';

import './devicesPool.html';

// Components used
import './device.html';
import './device.js';

// Template helpers
Template.devicesPool.helpers({
  devices() {
    return Devices.find({}, { sort: { make: 1, year: -1, name: 1 } });
  }
});
