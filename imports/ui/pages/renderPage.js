// Meteor stuff
// import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
// import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { _ } from 'meteor/underscore';

// Functions
import { setDocHead } from '../../functions/client/setDocHead.js';
import { scaleByIntToFit } from '../../functions/client/scaleByIntToFit.js';
import { reduceFraction } from '../../functions/client/reduceFraction.js';

// Collections
import { EboyPix } from '../../api/eboypix/eboypix.js';
import { Colors } from '../../api/colors/colors.js';
import { Devices } from '../../api/devices/devices.js';

import './renderPage.html';

let canvas;
let context;
let maxCanvasW = 512;
let maxCanvasH = 512;

const deviceDep = new Tracker.Dependency();
const makeDep = new Tracker.Dependency();
// const colorDep = new Tracker.Dependency();

// Template onCreated
Template.renderPage.onCreated(function() {
  const self = this;
  self.autorun(function() {
    setDocHead();
    const thisId = FlowRouter.getParam('_id');
    self.subscribe('pix.single.public', thisId);
    self.subscribe('colors.public');
    self.subscribe('devices.public');
  });
});

Template.canvas.onCreated(function() {
  Session.set('addFactor', 0);
});

Template.canvas.onRendered(function() {
  const self = this;
  self.autorun(function() {
    deviceDep.depend();

    // get the Image
    const thisId = FlowRouter.getParam('_id');
    const thisDocument = EboyPix.findOne(thisId);

    // get backgroundColor of Image
    let color = Colors.findOne(
        { name: thisDocument.backgroundColor },
    );

    const selectedColorId = Session.get('colorId');
    if (selectedColorId) {
      color = Colors.findOne(
          { _id: selectedColorId },
      );
    }

    // set up hsl color string
    let hslColor;
    if (color) {
      hslColor = String(
          'hsl(' +
          color.hue + ', ' +
          color.saturation + '%, ' +
          color.luminosity + '%)',
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
        1, // as this is for donwloads, factor is set to 1 manually
    );

    // get the factor calculated automatically
    const autoFactor = scaledDims.factor;
    // the user might want to modify the factor for a better result
    const userFactor = Math.max(1, autoFactor + Session.get('addFactor'));
    Session.set('userFactor', userFactor);

    // based on the userFactor calculate new image dimensions
    const newWidth = scaledDims.width / autoFactor * userFactor;
    const newHeight = scaledDims.height / autoFactor * userFactor;

    // calculate border
    const paddingW = (maxCanvasW - newWidth) / 2;
    const paddingH = (maxCanvasH - newHeight) / 2;

    // set up Canvas
    const myImage = new Image();

    // to allow downloading the canvas set crossOrigin
    // change CORS policy on Amazon S3: <AllowedHeader>*</AllowedHeader>
    myImage.setAttribute('crossOrigin', 'anonymous');

    const imageURL = thisDocument.url;

    /* add date to image URL, to fix Safari and Crome caching issue
    (the image would be cached without the Access-Control-Allow-Origin header
    if image was being loaded via img tag or or CSS) */
    const imageUrlAndDate = imageURL + '?t=' + new Date().getTime();

    myImage.src = imageUrlAndDate;
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
          maxCanvasH,
      );

      context.mozImageSmoothingEnabled = false;
      context.msImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;

      context.drawImage(
          myImage,
          paddingW,
          paddingH,
          newWidth,
          newHeight,
      );
      // generate png from canvas
      const download = document.getElementById('genImg');
      const dataURL = canvas.toDataURL('image/png');
      download.href = dataURL;
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
  spriteName() {
    const originalFileName = this.name;
    // remove file extension
    const truncName = originalFileName.replace(/\.[^/.]+$/, '');

    // read dimensions from default
    let deviceDimensions = maxCanvasW + 'x' + maxCanvasH;
    // use device dimensions if selected
    if (Session.get('device')) {
      const dims = Session.get('device');
      deviceDimensions = dims.width + 'x' + dims.height;
    }

    // add dimensions to file name
    const nameAndDims = truncName + '-' + deviceDimensions;

    // convert to lowercase and replace whitespace with '-'
    const cleanName = nameAndDims.toLowerCase().replace(/ /gi, '-');
    const newFileName = cleanName + '-eboydb.png';
    return newFileName;
  },
  makers() {
    const distinctEntries = _.uniq(Devices.find({}, {
      sort: { make: 1 }, fields: { make: true },
    }).fetch().map(function(x) {
      return x.make;
    }), true);
    return distinctEntries;
  },
  devices() {
    makeDep.depend();
    const makeSelected = Session.get('make');
    return Devices.find({ make: makeSelected }, { sort: { make: 1, name: 1 } });
  },
  deviceDims() {
    deviceDep.depend();
    // read dimensions from default
    let deviceDimensions = maxCanvasW + 'x' + maxCanvasH;
    // use device dimensions if selected
    if (Session.get('device')) {
      const device = Session.get('device');
      deviceDimensions = device.width + ' × ' + device.height;
    }
    return deviceDimensions;
  },
  deviceSelected() {
    makeDep.depend();
    if (Session.get('device')) {
      return true;
    }
  },
  scale() {
    // return Session.get('addFactor');
    return Session.get('userFactor');
  },
  ratio() {
    const w = Session.get('device').width;
    const h = Session.get('device').height;
    const ratio = reduceFraction(w, h);
    return {
      n: ratio.numerator,
      d: ratio.denominator,
    };
  },
  colors() {
    const myColors = Colors.find({}, {
      sort: { name: 1 },
    });
    return myColors;
  },
});

Template.renderPage.events({
  'change #selectDevice'(event) {
    event.preventDefault();
    const deviceId = event.target.value;
    const selectedDevice = Devices.findOne(deviceId);
    Session.set('device', selectedDevice);
    maxCanvasW = selectedDevice.width;
    maxCanvasH = selectedDevice.height;
    deviceDep.changed();
  },
  'change #selectMake'(event) {
    event.preventDefault();
    const make = event.target.value;
    Session.set('make', make);
    Session.set('device', false);
    const element = document.getElementById('selectDevice');
    element.selectedIndex = 0;
    makeDep.changed();
  },
  'change #selectColor'(event) {
    event.preventDefault();
    const colorId = event.target.value;
    Session.set('colorId', colorId);
    // const element = document.getElementById('colorId');
    // element.selectedIndex = 0;
    // colorDep.changed();
  },
  'click #scaleDown'(event) {
    event.preventDefault();
    const addFactor = Session.get('addFactor');
    // calculate new addFactor
    // don't allow values lower than -10
    const newAddFactor = Math.max(-10, addFactor - 1);
    const newAddFactorRounded = Math.round(newAddFactor * 100) / 100;
    Session.set('addFactor', newAddFactorRounded);
  },
  'click #scaleUp'(event) {
    event.preventDefault();
    const addFactor = Session.get('addFactor');
    // calculate new addFactor
    // don't allow values higher than +100
    const newAddFactor = Math.min(addFactor + 1, 100);
    const newAddFactorRounded = Math.round(newAddFactor * 100) / 100;
    Session.set('addFactor', newAddFactorRounded);
  },
});
