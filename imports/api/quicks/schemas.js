import { Quicks } from './quicks.js';

// Create Schema
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
export const QuicksSchema = {};

QuicksSchema.Links = new SimpleSchema({
  name: {
    type: String,
    unique: true
  },
  slug: {
    type: String
  },
  query: {
    type: String,
    optional: true
  }
});

Quicks.attachSchema(QuicksSchema.Links);
