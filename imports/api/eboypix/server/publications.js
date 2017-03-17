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
// Meteor.publish('pix.public', function pixPublic() {
//   const selector = {}; // find all pix
//   return EboyPix.find(selector);
// });

Meteor.publish('pix.pinned.public', function pixPinnedPublic() {
  const selector = { projects: 'pinned' }; // pix that are pinned
  return EboyPix.find(selector);
});

// Publish all documents later than given date
// this is used to show all newly added images
Meteor.publish('pix.afterDate.public', function pixAfterDatePublic(date, userId) {
  const selector = {
    'uploadedBy.id': userId,
    'createdAt': {
      $gt: date
    }
  };
  return EboyPix.find(selector);
});

// Publish paged documents
Meteor.publish('pix.paged.public', function pixPagedPublic(slug, page, query) {
  // Check is user is logged in
  const userId = this.userId;
  // Generate a proper selector for the query
  const selector = urlToSelector(slug, query, userId);
  const pixPage = Meteor.settings.public.navigation.pixPerPage;
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

// publish total count of search query in EboyPix
Meteor.publish('pix.counts.public', function(slug, query) {
  // Check is user is logged in
  const userId = this.userId;
  const selector = urlToSelector(slug, query, userId);
  Counts.publish(
    this,
    'totalDocsCount',
    EboyPix.find(selector),
    { noReady: true }
  );
});

// publish total count of EboyPix with access level 1
Meteor.publish('pix.accesscounts.public', function() {
  const selector = { access: 1 };
  Counts.publish(
    this,
    'accessOneCount',
    EboyPix.find(selector),
    { noReady: true }
  );
});

// Publish all project urls for subscriptions
Meteor.publish('pix.urls.public', function pixUrlsPublic(project) {
  const selector = { projects: project }; // find all pix
  // const selector = { projects: 'gfsub' }; // find all pix
  const options = {
    fields: {
      url: 1,
      backgroundColor: 1
    }
  };
  return EboyPix.find(selector, options);
// Set server route for simple:rest package
//
}, {
  url: "api/projects/:0"
});
