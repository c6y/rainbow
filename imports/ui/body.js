import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { EboyPix } from '../api/eboypix.js';
import './pic.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.body.helpers({
  pix() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return EboyPix.find({
        checked: { $ne: true }
      }, {
        sort: { createdAt: -1 }
      });
    }
    // Show newest task at the top
    return EboyPix.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
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
        dimensions: { width: this.width, height: this.height }
      });
      // Clear form
      target.url.value = '';
    };
  }
});
