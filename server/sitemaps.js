  // Meteor stuff
import { sitemaps } from 'meteor/gadicohen:sitemaps';

// Collections
import { Quicks } from '../imports/api/quicks/quicks.js';
import { EboyPix } from '../imports/api/eboypix/eboypix.js';

// const quicksCount = Quicks.find().count();
const quicksLabels = Quicks.find().fetch();

function getLatestQuickDate(slug) {
  console.log('in function slug: ' + slug);
  const latestQuick = EboyPix.findOne(
    { tags: slug },
    { sort: { createdAt: -1, limit: 1 } }
  );
  if (latestQuick) {
    console.log(slug + ': ' + latestQuick.createdAt);
    return latestQuick.createdAt;
  }
}

const quicksLinks = function() {
  let quicksPagesAll = [];
  if (quicksLabels) {
    Object.keys(quicksLabels).forEach(function(key) {
      const slug = quicksLabels[key].slug.toString();
      console.log('the slug: ' + slug);
      const lastmod = getLatestQuickDate(slug);
      const quicksPage = {
        page: 'pool/' + quicksLabels[key].label + '/1',
        changefreq: 'weekly',
        priority: quicksLabels[key].rank,
        lastmod: lastmod
      };
      quicksPagesAll.push(quicksPage);
    });
    return quicksPagesAll;
  }
};

sitemaps.add('/sitemap.xml', function() {
  return quicksLinks();
});
