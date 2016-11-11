// import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';

import { EboyPix } from '../../api/eboypix/eboypix.js';
import { Colors } from '../../api/colors/colors.js';

import './spriteBox.html';

// Components used
import './picSpriteZoom.js';
import './picSpriteZoom.html';
import './picMeta.js';
import './picMeta.html';

Template.spriteBox.onCreated(function() {
  this.metaShow = new ReactiveVar(false);
});

// Template helpers
Template.spriteBox.helpers({
  spriteDoc() {
    // Get single document by id
    const thisId = FlowRouter.getParam('_id');
    const pixDoc = EboyPix.findOne(thisId);
    return pixDoc;
  },
  colorHSL() {
    // Get the color by name
    const color = Colors.findOne(
      { name: this.backgroundColor }
    );
    // If it's in the color database return hsl values as css hsl string
    if (color) {
      const hslColor = String(
        'hsl(' +
        color.hue + ', ' +
        color.saturation + '%, ' +
        color.luminosity + '%)'
      );
      return {
        info: hslColor,
        value: hslColor
      };
    }
    // If color does not exist return diagonal stripes warning pattern
    const emptyColor = 'repeating-linear-gradient(' +
      '135deg,' +
      'transparent,' +
      'transparent 0.5em,' +
      '#ccc 0.5em,' +
      '#ccc 1em' +
      ')';
    return {
      info: 'Warning! Assign a color!',
      value: emptyColor
    };
  },
  isVisible() {
    return Template.instance().metaShow.get();
  },
  toggleMetDots() {
    const showingMeta = Template.instance().metaShow.get();
    return showingMeta === true ? '.' : '...';
  }
});

Template.spriteBox.events({
  'click .spriteBoxInfoToggle'() {
    const oldShowingMeta = Template.instance().metaShow.get();
    const newShowingMeta = oldShowingMeta === false;
    Template.instance().metaShow.set(newShowingMeta);
  },
  'click .copyright'() {
    const oldShowingMeta = Template.instance().metaShow.get();
    const newShowingMeta = oldShowingMeta === false;
    Template.instance().metaShow.set(newShowingMeta);
  }
});
