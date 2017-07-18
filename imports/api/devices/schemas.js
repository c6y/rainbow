// Meteor stuff
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const DeviceSchema = {};

DeviceSchema.Devices = new SimpleSchema({
  name: {
    type: String,
    unique: true
  },
  make: {
    type: String,
    unique: false
  },
  width: {
    type: Number,
    min: 0
  },
  height: {
    type: Number,
    min: 0
  },
  createdAt: {
    type: Date
  }
});
