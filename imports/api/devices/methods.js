// Meteor stuff
import { Meteor } from 'meteor/meteor';

// Collections
import { Devices } from './devices.js';

// Functions
// import { cleanString } from '../../functions/server/cleanString.js';
// import { tagsToArray } from '../../functions/server/tagsToArray.js';
import { isAdminOrEditor, isAdmin } from '../../functions/server/isUser.js';

Meteor.methods({
  'devices.insert'(name, make, width, height, date) {
    if (isAdminOrEditor()) {
      Devices.insert({
        name: name,
        make: make,
        width: width,
        height: height,
        createdAt: new Date()
      });
      console.log(name + ': inserted to Devices');
    }
  },
  'devices.deleteAll'() {
    if (isAdmin()) {
      Devices.remove({});
      console.log('removed all documents from Devices');
    }
  },
  'devices.delete'(id) {
    if (isAdminOrEditor()) {
      Devices.remove(id);
      console.log(id + ': removed from Devices');
    }
  }
});
