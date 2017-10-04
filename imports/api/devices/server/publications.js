// Meteor stuff
import { Meteor } from 'meteor/meteor';

// Collections
import { Devices } from '../devices.js';

// Schemas
import { DeviceSchema } from '../schemas.js';

Devices.attachSchema(DeviceSchema.Devices);

Meteor.publish('devices.public', function devicesPublic() {
  const selector = {}; // find all
  return Devices.find(selector);
});
