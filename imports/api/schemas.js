// Create Schema
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
export const Schemas = {};

Schemas.Pix = new SimpleSchema({
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
  'project': {
    type: String,
    optional: true
  },
  'fullframe': {
    type: Boolean,
    optional: true
  }
});

Schemas.HSLAColors = new SimpleSchema({
  name: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date
  },
  hue: {
    type: Number,
    min: 0,
    max: 360
  },
  saturation: {
    type: Number,
    min: 0,
    max: 100
  },
  luminosity: {
    type: Number,
    min: 0,
    max: 100
  },
  alpha: {
    type: Number,
    decimal: true,
    defaultValue: 1,
    min: 0,
    max: 1
  },
  tags: {
    type: [String]
  }
});
