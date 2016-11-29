import { SimpleSchema } from 'meteor/aldeed:simple-schema';
export const PicSchema = {};

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
    type: String
  },
  'license': {
    type: String
  },
  'fullFrame': {
    type: Boolean,
    optional: true
  }
});
