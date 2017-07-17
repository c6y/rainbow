let canvas;
let context;

// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';

// Functions
import { setDocHead } from '../../functions/client/setDocHead.js';

// Collections
import { EboyPix } from '../../api/eboypix/eboypix.js';

import './renderPage.html';

// Components used
// import '../components/pix/picSpriteZoom.js';
// import '../components/pix/picSpriteZoom.html';
// import '../components/pix/picMeta.js';
// import '../components/pix/picMeta.html';

// Template onCreated
Template.renderPage.onCreated(function() {
  // this.metaShow = new ReactiveVar(false);
  const self = this;
  self.autorun(function() {
    setDocHead();

    const thisId = FlowRouter.getParam('_id');
    self.subscribe('pix.single.public', thisId);
    self.subscribe('colors.public');
  });
});

Template.canvas.onRendered(function() {
  const self = this;
  self.autorun(function() {
    const thisId = FlowRouter.getParam('_id');
    const thisDocument = EboyPix.findOne(thisId);

    // const originalWidth = thisDocument.dimensions.width;
    // const originalHeight = thisDocument.dimensions.height;

    // let myImage = new Image();
    // myImage.src = thisDocument.url();

    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');

    context.fillStyle = "#FF0000";
    context.fillRect(
      0,
      0,
      120,
      60
    );

    // myImage.onload = function() {
    //   canvas = document.getElementById('myCanvas');
    //   context = canvas.getContext('2d');
    //
    //   // canvas.style.width = "200px";
    //   // canvas.style.height = "100px";
    //
    //   canvas.setAttribute('width', 50);
    //   canvas.setAttribute('height', 40);
    //
    //   // context.fillStyle = "#FF0000";
    //   // context.fillRect(
    //   //   0,
    //   //   0,
    //   //   30,
    //   //   30
    //   // );
    //
    //   // context.drawImage(
    //   //   myImage,
    //   //   10,
    //   //   10,
    //   //   30,
    //   //   20
    //   // );
    // };
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
  }
  // isVisible() {
  //   return Template.instance().metaShow.get();
  // },
  // copyright() {
  //   return Meteor.settings.public.ownership.creator.name;
  // },
  // madeDateShort() {
  //   const date = this.madeDate;
  //   if (date === undefined) {
  //     return '';
  //   }
  //   const shortDate = date.toISOString().substring(0, 4);
  //   return shortDate;
  // }
});

Template.renderPage.events({
  // Toggle metadata
  // 'click .copyright'() {
  //   const oldShowingMeta = Template.instance().metaShow.get();
  //   const newShowingMeta = oldShowingMeta === false;
  //   Template.instance().metaShow.set(newShowingMeta);
  // }
});
