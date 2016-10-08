import { Mongo } from 'meteor/mongo';

export const EboyPix = new Mongo.Collection('eboypix');
// GlobalEboyPix = EboyPix; // for chrome mongo access, remove this later
