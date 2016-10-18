import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { EboyPix } from '../../api/eboypix/eboypix.js';

import './spriteBox.html';

// Template.spriteBox.onCreated(function() {
//   const self = this;
//   self.autorun(function() {
//     const thisId = FlowRouter.getParam('_id');
//     self.subscribe('EboyPix', thisId);
//   });
// });

// Template.spriteBox.onCreated(function spriteShowPageOnCreated() {
//   this.getSpriteId = () => FlowRouter.getParam('_id');
//
//   this.autorun(() => {
//     this.subscribe('EboyPix', { _id: this.getSpriteId() });
//   });
// });

Template.spriteBox.onCreated(function spriteShowPageOnCreated() {
  const thisId = FlowRouter.getParam('_id');

  this.autorun(() => {
    this.subscribe('EboyPix', thisId);
  });
});

// Template.spriteBox.helpers({
//   spriteUrl() {
//     const thisId = FlowRouter.getParam('_id');
//     console.log('thisId: ' + thisId);
//     const thisUrl = EboyPix.findOne(thisId).url;
//     return thisUrl;
//   }
// });

// Template.spriteBox.helpers({
//   spriteUrl() {
//     this.getSpriteId = () => FlowRouter.getParam('_id');
//     console.log('this.getSpriteId: ' + this.getSpriteId);
//     const thisUrl = EboyPix.findOne(this.getSpriteId).url;
//     return thisUrl;
//   }
// });
