import { Meteor } from 'meteor/meteor';

import { EboyPix } from '../eboypix.js';

// Publish all documents
Meteor.publish('pix.public', function pixPublic() {
  const selector = {}; // find all pix
  return EboyPix.find(selector);
});

// Publish paged documents
Meteor.publish('pix.paged.public', function pixPublic(skipCount) {
  const selector = {}; // find all pix
  // convert to integer
  const skipCountInt = parseInt(skipCount, 10);
  const options = {
    limit: 3,
    skip: skipCountInt
  };
  return EboyPix.find(selector, options);
});

// Publish one single document
Meteor.publish('pix.single.public', function picPublic(id) {
  const selector = { _id: id }; // find single pic
  console.log('id: ' + id);
  return EboyPix.find(selector);
});
