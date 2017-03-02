// Collections
import { EboyPix } from '../../api/eboypix/eboypix.js';

// Functions
import { urlToSelector } from './urlToSelector.js';

/**
  * Returns the date from last document uploaded
  * @param {string} slug The search term
  * @param {string} query The query (tags, projects, name or 'everything')
  * @return {Date} the Date of the latest slug
  */
export function getLatestQuickDate(slug, query) {
  const selector = urlToSelector(slug, query);
  const latestSlug = EboyPix.findOne(
    selector,
    { sort: { createdAt: -1, limit: 1 } }
  );
  console.log('latestSlug: ' + latestSlug);
  if (latestSlug) {
    return latestSlug.createdAt;
  }
}
