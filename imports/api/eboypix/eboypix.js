import { Mongo } from 'meteor/mongo';

export const EboyPix = new Mongo.Collection('eboypix');

// For chrome mongo access, remove for safety
// GlobalEboyPix = EboyPix;
