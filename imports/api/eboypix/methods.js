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

Meteor.methods({
  'eboypix.insert'(url, imageWidth, imageHeight) {
    const picName = getPicName(url);

    const projectName = getProjectName(url);
    // Create array if there's a projectName, else keep it undefined
    let projectArray = [projectName];
    if (!projectName) {
      projectArray = undefined;
    }

    const picMadeDate = getPathDate(url);

    const fileType = getFileType(url);
    // default jpgs to fullFrame
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
      madeDate: picMadeDate
    });
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
  },
  'eboypix.updateProjects'(taskId, newProjects) {
    EboyPix.update(
      taskId,
      { $set: { projects: newProjects } }
    );
  },
  'eboypix.updateProject'(taskId, newProject) {
    EboyPix.update(
      taskId,
      { $set: { project: newProject } }
    );
  },
  'eboypix.updateMadeDate'(taskId, newDate) {
    EboyPix.update(
      taskId,
      { $set: { madeDate: newDate } }
    );
  },
  'eboypix.updateFullFrame'(taskId, newState) {
    EboyPix.update(
      taskId,
      { $set: { fullFrame: newState } }
    );
  }
  // 'eboypix.updateFullFrame'(taskId) {
  //   const oldState = EboyPix.findOne({ _id: taskId }, { fullFrame: 1 });
  //   // If oldState is undefined set fixedOldState as false, else true;
  //   const fixedOldState = oldState.fullFrame === true;
  //   const newState = fixedOldState === false;
  //   EboyPix.update(
  //     taskId,
  //     { $set: { fullFrame: newState } }
  //   );
  // }
});
