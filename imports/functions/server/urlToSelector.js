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
  const reg = RegExp(slug, 'i', 's');
  const slugRegExp = { $regex: reg };

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
            { name: slugRegExp },
            userAccess,
          ],
        };
      } else if (query === 'tag') {
        // console.log('search Tag');
        selector = {
          $and: [
            { tags: slugRegExp },
            userAccess,
          ],
        };
      } else if (query === 'project') {
        // console.log('search Project');
        selector = {
          $and: [
            { projects: slugRegExp },
            userAccess,
          ],
        };
      } else {
        // console.log('search ANYWHERE');
        selector = {
          $and: [
            { $or: [
              { tags: slugRegExp },
              { projects: slugRegExp },
              { name: slugRegExp },
            ] },
            userAccess,
          ],
        };
      }
    }
  }
  return selector;
}
