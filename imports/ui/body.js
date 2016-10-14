import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { EboyPix } from '../api/eboypix/eboypix.js';
import { Colors } from '../api/colors/colors.js';

import './body.html';
import './pic.js';
import './pic.html';
import './color.js';
import './color.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.body.helpers({
  pix() {
    return EboyPix.find({}, { sort: { createdAt: -1 } });
  },
  pixCounter() {
    return EboyPix.find({}).count();
  },
  colors() {
    return Colors.find({}, { sort: { hue: -1 } });
  },
  colorCounter() {
    return Colors.find({}).count();
  },
  colorsNamesList() {
    let colorNamesArray = [];
    // const colorlist = Colors.find({}, { name: 1, createdAt: 1, _id: 0 }, { sort: { name: 1 } })
    const colorlist = Colors.find(
      {},
      { sort: { name: 1 } },
      { name: 1, _id: 0 }
    );
    colorlist.forEach(function(u) {
      colorNamesArray.push(u.name);
    });
    return colorNamesArray;
  }
});

Template.body.events({
  'submit .new-pic-batch'(event) {
    event.preventDefault();
    // Assign form input to constant
    const target = event.target;
    const imgBatchURLs = target.batchchurls.value;
    // Remove line breaks
    const imgBatchURLsClean = imgBatchURLs.replace(/[\r\n]/g, ',');
    console.log('imgBatchURLsClean: ' + imgBatchURLsClean);

    // Create an array and populate with urls
    let urls = [];
    urls = imgBatchURLsClean.split(",");

    // Only keep elements that start with 'http'
    urls = urls.filter(function(element) {
      return element.startsWith('http');
    });

    console.log('urls.length: ' + urls.length);

    (function nextImage(urls) {
      if (urls.length) {
        let img = new Image();
        img.onload = function() {
          Meteor.call('eboypix.insert', img.src, img.width, img.height);
          // setTimeout(function() {
          nextImage(urls);
          // }, 2000);
        };
        img.src = urls.shift();
      }
    })(urls.slice());
  },
  'click .deleteAllDocs'() {
    Meteor.call('eboypix.deleteAll');
  },
  'click .deleteAllColors'() {
    Meteor.call('colors.deleteAll');
  },
  'submit .new-color'(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name.value;
    const hue = target.hue.value;
    const lum = target.luminosity.value;
    const sat = target.saturation.value;
    Meteor.call('colors.insert', name, hue, sat, lum, 1);
    // Clear form
    target.name.value = '';
    target.hue.value = '';
    target.luminosity.value = '';
    target.saturation.value = '';
  }
});
