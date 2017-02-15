// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

// Collections
import { EboyPix } from './eboypix.js';
import { Colors } from '../colors/colors.js';

// Functions
import { getProjectName } from '../../functions/server/getProjectName.js';
import { getPathDate } from '../../functions/server/getPathDate.js';
import { getPicName } from '../../functions/server/getPicName.js';
import { getFileType } from '../../functions/server/getFileType.js';
import { isAdminOrEditor, isAdmin } from '../../functions/server/isUser.js';

Meteor.methods({
  'eboypix.insert'(url, imageWidth, imageHeight) {
    if (isAdminOrEditor()) {
      const picName = getPicName(url);
      const projectName = getProjectName(url);
      const picMadeDate = getPathDate(url);

      // Create array if there's a projectName, else keep it undefined
      let projectArray = [projectName];
      if (!projectName) {
        projectArray = undefined;
      }
      // Default jpgs to fullFrame
      const fileType = getFileType(url);
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
        tags: [],
        copyright: '©eBoy',
        license: 'CC BY-NC-ND 4.0',
        projects: projectArray,
        fullFrame: fullFrame,
        madeDate: picMadeDate,
        isPublic: false
      });
      console.log(url + ': inserted to EboyPix');
    }
  },
  'eboypix.delete'(pixId) {
    if (isAdminOrEditor()) {
      EboyPix.remove(pixId);
      console.log(pixId + ': removed from EboyPix');
    }
  },
  'eboypix.deleteAll'() {
    if (isAdmin()) {
      EboyPix.remove({});
      console.log('removed all documents from EboyPix');
    }
  },
  'eboypix.updateLicense'(taskId, newLicense) {
    if (isAdminOrEditor()) {
      EboyPix.update(
        taskId,
        { $set: { license: newLicense } }
      );
      console.log(taskId + ': license updated: "' + newLicense + '"');
    }
  },
  'eboypix.updateCopyright'(taskId, newCopyright) {
    if (isAdminOrEditor()) {
      EboyPix.update(
        taskId,
        { $set: { copyright: newCopyright } }
      );
      console.log(taskId + ': copyright updated: "' + newCopyright + '"');
    }
  },
  'eboypix.updateBackColor'(taskId, newBackColor) {
    if (isAdminOrEditor()) {
      EboyPix.update(
        taskId,
        { $set: { backgroundColor: newBackColor } }
      );
      console.log(taskId + ': backColor updated: "' + newBackColor + '"');
    }
  },
  'eboypix.updateTags'(taskId, newTagsArray) {
    if (isAdminOrEditor()) {
      EboyPix.update(
        taskId,
        { $set: { tags: newTagsArray } }
      );
      console.log(taskId + ': tags updated: "' + newTagsArray + '"');
    }
  },
  'eboypix.updateProjects'(taskId, newProjects) {
    if (isAdminOrEditor()) {
      EboyPix.update(
        taskId,
        { $set: { projects: newProjects } }
      );
      console.log(taskId + ': projects updated: "' + newProjects + '"');
    }
  },
  'eboypix.updateMadeDate'(taskId, newDate) {
    if (isAdminOrEditor()) {
      EboyPix.update(
        taskId,
        { $set: { madeDate: newDate } }
      );
      console.log(taskId + ': madeDate updated: "' + newDate + '"');
    }
  },
  'eboypix.updateFullFrame'(taskId, newState) {
    if (isAdminOrEditor()) {
      EboyPix.update(
        taskId,
        { $set: { fullFrame: newState } }
      );
      console.log(taskId + ': fullFrame updated: "' + newState + '"');
    }
  },
  'eboypix.updateIsPublic'(taskId, newState) {
    if (isAdminOrEditor()) {
      EboyPix.update(
        taskId,
        { $set: { isPublic: newState } }
      );
      console.log(taskId + ': isPublic updated: "' + newState + '"');
    }
  },
  'eboypix.updateAccess'(taskId, newState) {
    if (isAdminOrEditor()) {
      EboyPix.update(
        taskId,
        { $set: { access: newState } }
      );
      console.log(taskId + ': access updated: "' + newState + '"');
    }
  }
});
