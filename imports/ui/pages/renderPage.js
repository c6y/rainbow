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
let maxCanvasW = 512;
let maxCanvasH = 512;
let deviceDep = new Tracker.Dependency();

// Template onCreated
Template.renderPage.onCreated(function() {
  this.device = new ReactiveVar();
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
  // console.log('this.device.name: ' + this.device.name);
  const self = this;
  self.autorun(function() {
    deviceDep.depend();
    console.log(maxCanvasW + ' x ' + maxCanvasH);

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
      maxCanvasW,
      maxCanvasH,
      1 // as this is for donwloads, factor is set to 1 manually
    );

    // calculate border
    const paddingW = (maxCanvasW - scaledDims.width) / 2;
    const paddingH = (maxCanvasH - scaledDims.height) / 2;

    // set up Canvas
    let myImage = new Image();
    myImage.src = thisDocument.url;
    myImage.onload = function() {
      canvas = document.getElementById('myCanvas');
      context = canvas.getContext('2d');

      canvas.setAttribute('width', maxCanvasW);
      canvas.setAttribute('height', maxCanvasH);
      canvas.style.width = maxCanvasW / 2 + 'px';
      canvas.style.height = maxCanvasH / 2 + 'px';

      context.fillStyle = hslColor;
      context.fillRect(
        0,
        0,
        maxCanvasW,
        maxCanvasH
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
  },
  devices() {
    return Devices.find({});
  },
  deviceDims() {
    deviceDep.depend();
    if (this.device) {
      return this.device.width + ' × ' + this.device.height;
    }
  }
});

Template.renderPage.events({
  'change #selectDevice'(event) {
    event.preventDefault();
    const deviceId = event.target.value;
    const selectedDevice = Devices.findOne(deviceId);
    this.device = selectedDevice;
    maxCanvasW = selectedDevice.width;
    maxCanvasH = selectedDevice.height;
    deviceDep.changed();
  }
});
