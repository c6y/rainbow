import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { EboyPix } from '../eboypix.js';

// Publish all documents
Meteor.publish('pix.public', function pixPublic() {
  const selector = {}; // find all pix
  return EboyPix.find(selector);
});

// Publish all documents later than given date
Meteor.publish('pix.afterDate.public', function pixAfterDatePublic(date) {
  const selector = {
    createdAt: {
      $gt: date
    }
  };
  return EboyPix.find(selector);
});

// Publish paged documents
Meteor.publish('pix.paged.public', function pixPagedPublic(slug, page) {
  const reg = RegExp(slug, 'i', 's');
  const slugRegExp = { $regex: reg };
  // If slug is 'everything' return full search, else search in tags
  const selector = slug === 'everything' ? {} : { tags: slugRegExp };

  const pixPage = Meteor.settings.public.pixPerPage;
  // Convert page string to integer
  let pageInt = parseInt(page, 10);
  const skipCount = (pageInt - 1) * pixPage;
  const options = {
    limit: pixPage,
    skip: skipCount,
    sort: { createdAt: -1 }
  };
  // return EboyPix.find({tags: 'test'}, options);
  return EboyPix.find(selector, options);
});

// Publish one single document
Meteor.publish('pix.single.public', function picPublic(id) {
  const selector = { _id: id }; // find single pic
  return EboyPix.find(selector);
});

// publish total count of docs in EboyPix as separate collection
Meteor.publish('pix.counts.public', function(slug) {
  const reg = RegExp(slug, 'i', 's');
  const slugRegExp = { $regex: reg };
  // If slug is 'everything' return full search, else search in tags
  const selector = slug === 'everything' ? {} : { tags: slugRegExp };
  Counts.publish(
    this,
    'totalDocsCount',
    EboyPix.find(selector),
    { noReady: true }
  );
});
