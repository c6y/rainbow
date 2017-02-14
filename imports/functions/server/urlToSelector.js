/**
 * takes the slug, the query and returns a proper Mongo selector
 * it does not take the page though — this returns all results
 * @param {string} slug — The search slug/term
 * @param {string} query — The query for the search
 * @param {string} userId — gets user ID if user is logged in
  * @return {object} selector — The Mongo selector
 */
export function urlToSelector(slug, query, userId) {
  const reg = RegExp(slug, 'i', 's');
  const slugRegExp = { $regex: reg };

  console.log('function gets this userId: ' + userId);

  // if user is not logged in,
  // limit search query to public documents ...
  let userAccess = { isPublic: true };

  if (userId) {
    // ... if user is logged in though,
    // do not limit seach to public docs
    // do show everything
    userAccess = {};
  }

  let selector = userAccess;

  if (slug !== 'everything') {
    if (query === 'name') {
      // console.log('search Name');
      selector = {
        $and: [
          { name: slugRegExp },
          userAccess
        ]
      };
    } else if (query === 'tag') {
      // console.log('search Tag');
      selector = {
        $and: [
          { tags: slugRegExp },
          userAccess
        ]
      };
    } else if (query === 'project') {
      // console.log('search Project');
      selector = {
        $and: [
          { projects: slugRegExp },
          userAccess
        ]
      };
    } else {
      // console.log('search ANYWHERE');
      selector = {
        $and: [
          { $or: [
            { tags: slugRegExp },
            { projects: slugRegExp },
            { name: slugRegExp }
          ] },
          userAccess
        ]
      };
    }
  }
  return selector;
}
