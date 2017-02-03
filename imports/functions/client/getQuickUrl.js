// Meteor stuff
import { FlowRouter } from 'meteor/kadira:flow-router';

/**
  * generates a url for a quick link
  * @param {string} slug The slug.
  * @param {string} query The original image width.
  * @return {string} url The url
  */
export function getQuickUrl(slug, query) {
  const theSlug = slug;
  const theQuery = query === 'default' ? undefined : query;
  const params = { slug: theSlug, page: 1 };
  const queryParams = { q: theQuery };
  const url = FlowRouter.path('pool', params, queryParams);
  return url;
}
