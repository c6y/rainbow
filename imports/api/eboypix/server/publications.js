// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

// Collections
import { EboyPix } from '../eboypix.js';

// Schemas
import { PicSchema } from '../schemas.js';

// Functions
import { urlToSelector } from '../../../functions/server/urlToSelector.js';

EboyPix.attachSchema(PicSchema.Pic);

// Publish all documents
Meteor.publish('pix.public', function pixPublic() {
  const selector = {}; // find all pix
  return EboyPix.find(selector);
});

Meteor.publish('pix.pinned.public', function pixPinnedPublic() {
  const selector = { projects: 'pinned' }; // pix that are pinned
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
Meteor.publish('pix.paged.public', function pixPagedPublic(slug, page, query) {
  const selector = urlToSelector(slug, query);
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
Meteor.publish('pix.counts.public', function(slug, query) {
  const selector = urlToSelector(slug, query);
  Counts.publish(
    this,
    'totalDocsCount',
    EboyPix.find(selector),
    { noReady: true }
  );
});

// Publish all project 'Game Frame' documents
Meteor.publish('pix.gameFrame.public', function pixGameFramePublic() {
  const selector = { projects: 'gfsub' }; // find all pix
  const options = {
    fields: {
      url: 1
    }
  };
  return EboyPix.find(selector, options);
});
