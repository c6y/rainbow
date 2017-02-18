// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const PicSchema = {};
export const UploadedBy = {};

UploadedBy.UserInfo = new SimpleSchema({
  id: {
    type: String
  },
  username: {
    type: String
  }
});

PicSchema.Pic = new SimpleSchema({
  'url': {
    type: SimpleSchema.RegEx.Url,
    unique: true
  },
  'name': {
    type: String
  },
  'createdAt': {
    type: Date
  },
  'uploadedBy': {
    type: UploadedBy.UserInfo
  },
  'madeDate': {
    type: Date,
    optional: true
  },
  'dimensions.width': {
    type: Number
  },
  'dimensions.height': {
    type: Number
  },
  'tags': {
    type: [String],
    optional: true
  },
  'projects': {
    type: [String],
    optional: true
  },
  'backgroundColor': {
    type: String
  },
  'copyright': {
    type: String,
    defaultValue: Meteor.settings.public.ownership.copyright
  },
  'license': {
    type: String,
    defaultValue: Meteor.settings.public.ownership.defaultLicense
  },
  'fullFrame': {
    type: Boolean,
    optional: true
  },
  'access': {
    type: Number,
    defaultValue: 3,
    min: 0,
    max: 3
  }
});
