import { Colors } from './colors.js';

// Create Schema
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
export const ColorSchema = {};

ColorSchema.HSLAColors = new SimpleSchema({
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

Colors.attachSchema(ColorSchema.HSLAColors);
