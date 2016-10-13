import { Mongo } from 'meteor/mongo';
import { Schemas } from '../schemas.js';
import '../methods.js';

export const EboyPix = new Mongo.Collection('eboypix');
EboyPix.attachSchema(Schemas.Pix);
