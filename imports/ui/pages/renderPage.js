// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';

// Functions
import { setDocHead } from '../../functions/client/setDocHead.js';
import { scaleByIntToFit } from '../../functions/client/scaleByIntToFit.js';

// Collections
import { EboyPix } from '../../api/eboypix/eboypix.js';
import { Colors } from '../../api/colors/colors.js';
import { Devices } from '../../api/devices/devices.js';

import './renderPage.html';

let canvas;
let context;
let maxCanvasSize = 512;
let deviceDep = new Tracker.Dependency();

// Components used
// import '../components/pix/picSpriteZoom.js';
// import '../components/pix/picSpriteZoom.html';
// import '../components/pix/picMeta.js';
// import '../components/pix/picMeta.html';

// Template onCreated
Template.renderPage.onCreated(function() {
  this.deviceId = new ReactiveVar();
  const self = this;
  self.autorun(function() {
    setDocHead();

    const thisId = FlowRouter.getParam('_id');
    self.subscribe('pix.single.public', thisId);
    self.subscribe('colors.public');
    self.subscribe('devices.public');
  });
});

Template.canvas.onRendered(function() {
  const self = this;
  self.autorun(function() {
    // get the Image
    const thisId = FlowRouter.getParam('_id');
    const thisDocument = EboyPix.findOne(thisId);

    // get backgroundColor of Image
    const color = Colors.findOne(
      { name: thisDocument.backgroundColor }
    );
    // set up hsl color string
    let hslColor;
    if (color) {
      hslColor = String(
        'hsl(' +
        color.hue + ', ' +
        color.saturation + '%, ' +
        color.luminosity + '%)'
      );
    } else {
      hslColor = 'hsl(0, 50%, 50%)';
    }

    // set dimensions of image
    const originalWidth = thisDocument.dimensions.width;
    const originalHeight = thisDocument.dimensions.height;

    // calculate optimal scaling of Image
    const scaledDims = scaleByIntToFit(
      originalWidth,
      originalHeight,
      maxCanvasSize,
      maxCanvasSize,
      1 // as this is for donwloads, factor is set to 1 manually
    );

    // console.log('originalHeight: ' + originalHeight);
    // console.log('scaledDims.height: ' + scaledDims.height);
    // console.log('window.devicePixelRatio: ' + window.devicePixelRatio);

    // calculate border
    const paddingW = (maxCanvasSize - scaledDims.width) / 2;
    const paddingH = (maxCanvasSize - scaledDims.height) / 2;

    // set up Canvas
    let myImage = new Image();
    myImage.src = thisDocument.url;
    myImage.onload = function() {
      canvas = document.getElementById('myCanvas');
      context = canvas.getContext('2d');

      canvas.setAttribute('width', maxCanvasSize);
      canvas.setAttribute('height', maxCanvasSize);
      canvas.style.width = maxCanvasSize / 2 + 'px';
      canvas.style.height = maxCanvasSize / 2 + 'px';

      context.fillStyle = hslColor;
      context.fillRect(
        0,
        0,
        maxCanvasSize,
        maxCanvasSize
      );

      context.mozImageSmoothingEnabled = false;
      context.msImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;

      context.drawImage(
        myImage,
        paddingW,
        paddingH,
        scaledDims.width,
        scaledDims.height
      );
    };
  });
});

// Template helpers
Template.renderPage.helpers({
  spriteDoc() {
    // Get single document by id
    const thisId = FlowRouter.getParam('_id');
    const pixDoc = EboyPix.findOne(thisId);
    return pixDoc;
    // return thisId;
  },
  devices() {
    return Devices.find({});

    // return Devices.find({}).map(function(doc) {
    //   return doc.name;
    // });
  },
  deviceName() {
    deviceDep.depend();
    return this.deviceId;
    // const id = this.deviceId;
    // const selectedDevice = Devices.findOne({ id });
    // return selectedDevice.name;
    // // return this.deviceId;
  }
});

Template.renderPage.events({
  'change #selectDevice'(event) {
    event.preventDefault();
    this.deviceId = event.target.value;

    deviceDep.changed();

    // console.log('event.target.value: ' + event.target.value);
    console.log('this.deviceId: ' + this.deviceId);
    // const target = event.target;
    // const device = target.device.value;
    // console.log('device: ' + device);

    // console.log('YES');
    // this.device =
  }
  // Toggle metadata
  // 'click .copyright'() {
  //   const oldShowingMeta = Template.instance().metaShow.get();
  //   const newShowingMeta = oldShowingMeta === false;
  //   Template.instance().metaShow.set(newShowingMeta);
  // }
});
