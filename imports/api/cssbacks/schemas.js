// Meteor stuff
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const CssBackSchema = {};

CssBackSchema.CssCode = new SimpleSchema({
  name: {
    type: String,
    unique: true,
  },
  code: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});
