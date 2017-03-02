  // Meteor stuff
import { sitemaps } from 'meteor/gadicohen:sitemaps';

// Collections
import { Quicks } from '../imports/api/quicks/quicks.js';

// Functions
import { getLatestQuickDate } from '../imports/functions/server/getLatestQuickDate.js';

// Retuns array of pages from Quicks collection
const quicksLinks = function() {
  const quicksLabels = Quicks.find().fetch();
  let quicksPagesAll = [];
  if (quicksLabels) {
    Object.keys(quicksLabels).forEach(function(key) {
      const slug = quicksLabels[key].slug.toString();
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
