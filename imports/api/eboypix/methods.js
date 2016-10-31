import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import { EboyPix } from './eboypix.js';
import { Colors } from '../colors/colors.js';

import {
  getPicName,
  getProjectName,
  getFileType
} from '../functions.js';

Meteor.methods({
  'eboypix.insert'(url, imageWidth, imageHeight) {
    const picName = getPicName(url);
    let projectName = getProjectName(url);
    // projectName = projectName === undefined ? '' : projectName;
    // console.log('typeof projectName: ' + typeof projectName);
    const fileType = getFileType(url);
    // default jpgs to fullframe
    let fullFrame = false;
    if (fileType === 'jpg') {
      fullFrame = true;
    }
    // Get all available colors by name
    let colorNamesArray = [];
    const colorlist = Colors.find(
      {},
      { name: 1, _id: 0 },
      { sort: { createdAt: -1 } }
    );
    colorlist.forEach(function(u) {
      colorNamesArray.push(u.name);
    });
    // Get random index of color array
    const randomColorIndex = Math.floor(
      Random.fraction() * colorNamesArray.length
    );
    // Get random color name with random index
    const colorName = colorNamesArray[randomColorIndex];
    // Create new document
    EboyPix.insert({
      url: url,
      name: picName,
      createdAt: new Date(),
      dimensions: { width: imageWidth, height: imageHeight },
      backgroundColor: colorName,
      tags: ['sprite', 'eboy'],
      copyright: '©eBoy',
      license: 'CC BY-NC-ND 4.0',
      project: projectName,
      fullframe: fullFrame
    });
    console.log('successfully inserted: ' + picName);
  },
  'eboypix.delete'(pixId) {
    EboyPix.remove(pixId);
  },
  'eboypix.deleteAll'() {
    EboyPix.remove({});
  },
  'eboypix.updateLicense'(taskId, newLicense) {
    EboyPix.update(
      taskId,
      { $set: { license: newLicense } }
    );
  },
  'eboypix.updateCopyright'(taskId, newCopyright) {
    EboyPix.update(
      taskId,
      { $set: { copyright: newCopyright } }
    );
  },
  'eboypix.updateBackColor'(taskId, newBackColor) {
    EboyPix.update(
      taskId,
      { $set: { backgroundColor: newBackColor } }
    );
  },
  'eboypix.updateTags'(taskId, newTagsArray) {
    EboyPix.update(
      taskId,
      { $set: { tags: newTagsArray } }
    );
  }
});
