import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const EboyPix = new Mongo.Collection('eboypix');
// For chrome mongo access, remove for safety
// GlobalEboyPix = EboyPix;

Meteor.methods({
  'eboypix.insert'(url, imageWidth, imageHeight) {
    check(url, String);
    check(imageWidth, Number);
    check(imageHeight, Number);
    // Truncate the URL and return file name only
    // const picName = url.substring(url.lastIndexOf("/") + 1, url.length);
    const picName = getPicName(url);
    const projectName = getJobName(url);
    EboyPix.insert({
      url: url,
      name: picName,
      createdAt: new Date(),
      dimensions: { width: imageWidth, height: imageHeight },
      backgroundColor: '#272822',
      tags: ['sprite', 'eboy'],
      copyright: '©eBoy',
      license: 'CC BY-NC-ND 4.0',
      project: projectName
    });
  },
  'eboypix.delete'(pixId) {
    EboyPix.remove(pixId);
  },
  'eboypix.deleteAll'() {
    EboyPix.remove({});
  }
});

function getPicName(url) {
  const docNameEncoded = url.substring(url.lastIndexOf("/") + 1, url.length);
  const docNameDecoded = decodeURIComponent(docNameEncoded);
  return docNameDecoded;
}

function getJobName(url) {
  if (url.includes('/projects/')) {
    const slash = "/";
    const re = new RegExp(slash, 'gi');
    let results = [];
    // Populate Array with all indexes of '/'
    while (re.exec(url)) {
      results.push(re.lastIndex);
    }
    const jobNameStart = results[results.length - 2];
    const jobNameEnd = results[results.length - 1];
    const jobNameEncoded = url.substring(jobNameStart, jobNameEnd - 1);
    const jobNameDecoded = decodeURIComponent(jobNameEncoded);
    return decodeURIComponent(jobNameDecoded);
  }
}
