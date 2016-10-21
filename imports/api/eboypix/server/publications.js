import { Meteor } from 'meteor/meteor';

import { EboyPix } from '../eboypix.js';

Meteor.publish('pix.public', function pixPublic() {
  const selector = {}; // find all pix
  return EboyPix.find(selector);
});

Meteor.publish('pix.single.public.', function picPublic(id) {
  const selector = { id }; // find single pic
  return EboyPix.findOne(selector);
});
