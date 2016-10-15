import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { EboyPix } from '../api/eboypix/eboypix.js';
import { Colors } from '../api/colors/colors.js';

import './body.html';
import './components/pic.js';
import './components/pic.html';
import './components/color.js';
import './components/color.html';
import './components/colorInput.html';
import './components/colorInput.js';

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
  }
});
