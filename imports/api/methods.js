import { Meteor } from 'meteor/meteor';

import { EboyPix } from './eboypix/eboypix.js';
import { Colors } from './colors/colors.js';

import { getPicName, getProjectName, getFileType } from './functions.js';
import { Random } from 'meteor/random';

Meteor.methods({
  // 'eboypix.insert'(url, imageWidth, imageHeight) {
  //   const picName = getPicName(url);
  //   const projectName = getProjectName(url);
  //   const fileType = getFileType(url);
  //   let fullFrame = false;
  //   if (fileType === 'jpg') {
  //     fullFrame = true;
  //   }
  //   const hue = Math.round(Random.fraction() * 360);
  //   const sat = Math.round(Random.fraction() * 50 + 25);
  //   // console.log('hue: ' + hue);
  //   // console.log('sat: ' + sat);
  //   EboyPix.insert({
  //     url: url,
  //     name: picName,
  //     createdAt: new Date(),
  //     dimensions: { width: imageWidth, height: imageHeight },
  //     backgroundColor: { h: hue, s: sat, l: 60 },
  //     // backgroundColor: '272822',
  //     tags: ['sprite', 'eboy'],
  //     copyright: '©eBoy',
  //     license: 'CC BY-NC-ND 4.0',
  //     project: projectName,
  //     fullframe: fullFrame
  //   });
  // },
  'eboypix.insert'(url, imageWidth, imageHeight) {
    const picName = getPicName(url);
    const projectName = getProjectName(url);
    const fileType = getFileType(url);
    let fullFrame = false;
    if (fileType === 'jpg') {
      fullFrame = true;
    }
    // const hue = Math.round(Random.fraction() * 360);
    // const sat = Math.round(Random.fraction() * 50 + 25);
    // console.log('hue: ' + hue);
    // console.log('sat: ' + sat);
    // const colorsArray = Colors.find({}, { sort: { createdAt: -1 } });

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

    console.log('colorNamesArray.length: ' + colorNamesArray.length);
    console.log('randomColorIndex: ' + randomColorIndex);

    const colorName = colorNamesArray[randomColorIndex];

    EboyPix.insert({
      url: url,
      name: picName,
      createdAt: new Date(),
      dimensions: { width: imageWidth, height: imageHeight },
      backgroundColor: colorName,
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
  },
  'colors.insert'(n, h, s, l, a) {
    Colors.insert({
      name: n,
      createdAt: new Date(),
      hue: h,
      saturation: s,
      luminosity: l,
      alpha: a
    });
  },
  'colors.deleteAll'() {
    Colors.remove({});
  },
  'color.delete'(id) {
    Colors.remove(id);
  }
});
