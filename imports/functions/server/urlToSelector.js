// Meteor stuff
import { Meteor } from 'meteor/meteor';

/**
 * takes the slug, the query and returns a proper Mongo selector
 * it does not take the page though — this returns all results
 * @param {string} slug — The search slug/term
 * @param {string} query — The query for the search
 * @param {string} userId — gets user ID if user is logged in
 * @return {object} selector — The Mongo selector
 */
export function urlToSelector(slug, query, userId) {
  const queryObject = createQuerySelector(slug);
  const querySelector = queryObject.selector;
  const searchMode = queryObject.mode;

  console.log('searchMode: ' + searchMode);

  // If user is not logged in,
  // limit search query to documents with access level 0
  let userAccess = { access: 0 };

  // If user is logged in, allow increased access levels
  if (userId) {
    const user = Meteor.users.findOne(userId);
    const isEditor = user.profile.isEditor;
    const isAdmin = user.profile.isAdmin;
    if (isEditor || isAdmin) {
      userAccess = {};
    } else {
      userAccess = { access: { $lt: 2 } };
    }
  }

  // This default selector searches for everything
  // within the user's access level
  let selector = userAccess;

  // All searches not for 'everything' modify the default selector
  if (slug !== 'everything') {
    // Useful debugging searches
    if (slug === '_debug') {
      // Find all documents that have no tags
      if (query === 'notag') {
        selector = {
          $and: [
            { tags: [] },
            userAccess,
          ],
        };
      // Find all documents that have css background patterns
      } else if (query === 'cssbacks') {
        selector = {
          $and: [
            { backgroundPattern: { $exists: true } },
            userAccess,
          ],
        };
      }
    } else {
    // For any other slug check the query
      if (query === 'name') {
        // console.log('search Name');
        selector = {
          $and: [
            { name: querySelector },
            userAccess,
          ],
        };
      } else if (query === 'tag') {
        // console.log('search Tag');
        selector = {
          $and: [
            { tags: querySelector },
            userAccess,
          ],
        };
      } else if (query === 'project') {
        // console.log('search Project');
        selector = {
          $and: [
            { projects: querySelector },
            userAccess,
          ],
        };
      } else {
        // console.log('search ANYWHERE');
        if (searchMode !== 'not') {
          selector = {
            $and: [
              { $or: [
                { tags: querySelector },
                { projects: querySelector },
                { name: querySelector },
              ] },
              userAccess,
            ],
          };
        } else {
          selector = {
            $and: [
              { $and: [
                { tags: querySelector },
                { projects: querySelector },
                { name: querySelector },
              ] },
              userAccess,
            ],
          };
        };
      }
    }
  }
  return selector;
}

/**
 * Converts the search slug to a query selector.
 * Conversion depends on the slug's first control character.
 * If first char in slug is a '=', search for exact slug.
 * If first char in slug is a '-', search for docs that do not contain slug.
 * Otherwise do a grep search.
 * @param {string} slug — The search slug/term
 * @return {object} or {string} selector — The Mongo selector
 */
function createQuerySelector(slug) {
  let mode;
  const firstSlugChar = slug.charAt(0); // Get first slug character
  if (firstSlugChar === '~') {
    mode = 'exact';
    querySelector = slug.substring(1);
    return {
      selector: querySelector, // returns a plain string
      mode: mode,
    };
  } else if (firstSlugChar === '-') {
    mode = 'not';
    const slugWithoutMinus = '^' + slug.substring(1) + '$';
    const reg = new RegExp(slugWithoutMinus, 'i', 's');
    const slugRegExp = { $not: reg };
    querySelector = slugRegExp;
    return {
      selector: querySelector, // returns an object
      mode: mode,
    };
  } else {
    mode = 'contain';
    const reg = new RegExp(slug, 'i', 's');
    const slugRegExp = { $regex: reg };
    querySelector = slugRegExp;
    return {
      selector: querySelector, // returns an object
      mode: mode,
    };
  }
}
