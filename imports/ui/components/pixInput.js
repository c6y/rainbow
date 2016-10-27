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
    // console.log('imgBatchURLsClean: ' + imgBatchURLsClean);

    // Create an array and populate with urls
    let urls = [];
    urls = imgBatchURLsClean.split(",");

    // Only keep elements that start with 'http'
    urls = urls.filter(function(element) {
      return element.startsWith('http');
    });

    // Initialize Session variable to hold insert errors
    Session.set('insertErrors', []);

    (function nextImage(urls) {
      if (urls.length) {
        let img = new Image();
        img.onload = function() {
          Meteor.call('eboypix.insert', img.src, img.width, img.height, function(err, result) {
            if (err) {
              // Populate insertErrors Session array variable
              const session = Session.get('insertErrors');
              session.push(img.src);
              Session.set('insertErrors', session);
            } else {
              console.log('insert successfull: ' + img.src);
            }
          });
          // setTimeout(function() {
          nextImage(urls);
          // }, 2000);
        };
        img.src = urls.shift();
      }
    })(urls.slice());
    target.batchchurls.value = '';
  }
});
