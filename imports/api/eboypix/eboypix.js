import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { getPicName, getProjectName, getFileType } from './functions.js';
import { Random } from 'meteor/random';

export const EboyPix = new Mongo.Collection('eboypix');
// For chrome mongo access, remove for safety
// GlobalEboyPix = EboyPix;

Meteor.methods({
  'eboypix.insert'(url, imageWidth, imageHeight) {
    check(url, String);
    check(imageWidth, Number);
    check(imageHeight, Number);
    // Truncate the URL and return file name only
    // const picName = url.substring(url.lastIndexOf("/") + 1, url.length);
    const picName = getPicName(url);
    const projectName = getProjectName(url);
    const fileType = getFileType(url);
    let fullFrame = false;
    if (fileType === 'jpg') {
      fullFrame = true;
    }
    const hue = Math.round(Random.fraction() * 360);
    const sat = Math.round(Random.fraction() * 50 + 25);
    console.log('hue: ' + hue);
    console.log('sat: ' + sat);
    EboyPix.insert({
      url: url,
      name: picName,
      createdAt: new Date(),
      dimensions: { width: imageWidth, height: imageHeight },
      backgroundColor: { h: hue, s: sat, l: 60 },
      // backgroundColor: '272822',
      tags: ['sprite', 'eboy'],
      copyright: '©eBoy',
      license: 'CC BY-NC-ND 4.0',
      project: projectName,
      fullframe: fullFrame
    });
  },
  'eboypix.delete'(pixId) {
    EboyPix.remove(pixId);
  },
  'eboypix.deleteAll'() {
    EboyPix.remove({});
  }
});

const Schemas = {};

Schemas.Pix = new SimpleSchema({
  'url': {
    type: SimpleSchema.RegEx.Url
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
    type: [String]
  },
  // 'backgroundColor': {
  //   type: Number,
  //   regEx: /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  // },
  'backgroundColor.h': {
    type: Number
  },
  'backgroundColor.s': {
    type: Number
  },
  'backgroundColor.l': {
    type: Number
  },
  'copyright': {
    type: String
  },
  'license': {
    type: String
  },
  'project': {
    type: String
  },
  'fullframe': {
    type: Boolean
  }
});

EboyPix.attachSchema(Schemas.Pix);
