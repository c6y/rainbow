/**
 * takes the slug, the query and returns a proper Mongo selector
 * it does not take the page though — this returns all results
 * @param {string} slug — The search slug/term
 * @param {string} query — The query for the search
 * @return {object} selector — The Mongo selector
 */
export function urlToSelector(slug, query) {
  const reg = RegExp(slug, 'i', 's');
  const slugRegExp = { $regex: reg };

  let selector = {};

  if (slug !== 'everything') {
    if (query === 'name') {
      // console.log('search Name');
      selector = { name: slugRegExp };
    } else if (query === 'tag') {
      // console.log('search Tag');
      selector = { tags: slugRegExp };
    } else if (query === 'project') {
      // console.log('search Project');
      selector = { projects: slugRegExp };
    } else {
      // console.log('search ANYWHERE');
      selector = {
        $or: [
          { tags: slugRegExp },
          { projects: slugRegExp },
          { name: slugRegExp }
        ]
      };
    }
  }
  return selector;
}
