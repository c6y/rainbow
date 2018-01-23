import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.pixInput.events({
  'submit .new-pic-batch'(event) {
    event.preventDefault();

    // Set Session to time this batch was uploaded
    // to catch timing glitches, set time back by 30 seconds
    const timeNow = new Date();
    const secondsOffset = -30;
    const timeOffset = new Date(timeNow.getTime() + secondsOffset * 1000);
    Session.set('latestUploadAt', timeOffset);

    // Assign form input to constant
    const target = event.target;
    // get as string
    const imgBatchURLs = target.batchchurls.value;
    // Replace all occurences of http with https
    const imgBatchURLsHTTPS = imgBatchURLs.replace(/http:\/\//g, 'https://');
    // Replace all line breaks with commata
    const imgBatchURLsClean = imgBatchURLsHTTPS.replace(/[\r\n]/g, ',');

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
          Meteor.call(
            'eboypix.insert',
            img.src,
            img.width,
            img.height,
            function(err, result) {
              if (err) {
                // Populate insertErrors Session array variable
                const session = Session.get('insertErrors');
                session.push(img.src);
                Session.set('insertErrors', session);
              } else {
                console.log('client: insert successfull: ' + img.src);
              }
            }
          );
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
