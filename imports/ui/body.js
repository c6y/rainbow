import { Meteor } from 'meteor/meteor';
import { EboyPix } from '../api/eboypix/eboypix.js';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './pic.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.body.helpers({
  pix() {
    return EboyPix.find({}, { sort: { createdAt: -1 } });
  },
  pixCounter() {
    return EboyPix.find({ checked: { $ne: true } }).count();
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
  'click .deleteAll'() {
    Meteor.call('eboypix.deleteAll');
  }
});
