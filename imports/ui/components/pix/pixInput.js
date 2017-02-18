import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.pixInput.events({
  'submit .new-pic-batch'(event) {
    event.preventDefault();

    // Set Session to time when this batch was uploaded
    const uploadedAt = new Date();
    console.log('uploadedAt: ' + uploadedAt);

    // const uploadedAtISO = uploadedAt.toISOString();
    // console.log('uploadedAtISO: ' + uploadedAtISO);

    Session.set('latestUploadAt', uploadedAt);

    // Assign form input to constant
    const target = event.target;
    // get as string
    const imgBatchURLs = target.batchchurls.value;
    console.log('imgBatchURLs: ' + imgBatchURLs);
    // Remove line breaks
    const imgBatchURLsClean = imgBatchURLs.replace(/[\r\n]/g, ',');
    console.log('imgBatchURLsClean: ' + imgBatchURLsClean);

    // Create an array and populate with urls
    let urls = [];
    urls = imgBatchURLsClean.split(",");
    console.log('urls[0]: ' + urls[0]); // return first element

    // Only keep elements that start with 'http'
    urls = urls.filter(function(element) {
      return element.startsWith('http');
    });
    console.log('urls[0] http elements only: ' + urls[0]); // return first element

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
