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
  'submit .new-pic'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form target
    const target = event.target;
    const imgURL = target.url.value;

    let img = new Image();
    img.src = imgURL;
    img.onload = function() {
      EboyPix.insert({
        url: imgURL,
        createdAt: new Date(),
        dimensions: { width: this.width, height: this.height },
        backgroundColor: '#272822',
        tags: ['sprite', 'eboy'],
        copyright: '©eBoy',
        license: 'CC BY-NC-ND 4.0'
      });
      // Clear form
      target.url.value = '';
    };
  },
  'submit .new-pic-batch'(event) {
    event.preventDefault();
    // Assign form input to constant
    const target = event.target;
    const imgBatchURLs = target.batchchurls.value;
    // Remove line breaks
    const imgBatchURLsClean = imgBatchURLs.replace(/[\r\n]/g, '');

    // Create an array and populate with urls
    let urls = [];
    urls = imgBatchURLsClean.split(",");

    // Only keep elements that start with 'http'
    urls = urls.filter(function(element) {
      return element.startsWith('http');
    });

    console.log('urls.length: ' + urls.length);

    let n = 0;
    while (n < urls.length) {
      let stringurl = String(urls[n]);
      console.log('urls[' + n + ']: ' + stringurl);
      n++;
    }
  }
});
