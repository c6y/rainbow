import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.pixInput.events({
  'submit .new-pic-batch'(event) {
    event.preventDefault();

    // Set Session to time when this batch was uploaded
    Session.set('latestUploadAt', new Date());

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
  }
});
