// Meteor stuff
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const UserSchema = {};

UserSchema.UserProfile = new SimpleSchema({
  isAdmin: {
    type: Boolean,
  },
  isEditor: {
    type: Boolean,
  },
  isUser: {
    type: Boolean,
  },
});

UserSchema.User = new SimpleSchema({
  'username': {
    type: String,
  },
  'emails': {
    type: Array,
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
  },
  'createdAt': {
    type: Date,
  },
  'profile': {
    type: UserSchema.UserProfile,
  },
  'services': {
    type: Object,
    optional: true,
    blackbox: true,
  },
  // avoid an 'Exception in setInterval callback' from Meteor
  'heartbeat': {
    type: Date,
    optional: true,
  },
});
