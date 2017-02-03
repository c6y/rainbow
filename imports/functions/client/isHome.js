// Meteor stuff
import { FlowRouter } from 'meteor/kadira:flow-router';

/**
  * Checks if current location is home
  * @return {bool} true if is on home
  */
export function isHome() {
  const isPool = FlowRouter.getRouteName() === 'pool';
  const isPageOne = FlowRouter.getParam('page') === '1';
  const isSlugShowfoo = FlowRouter.getParam('slug') === 'showfoo';
  const query = FlowRouter.getQueryParam('q');
  let hasNoQuery = false;
  if (query === undefined) {
    hasNoQuery = true;
  }
  if (isPool && isPageOne && isSlugShowfoo && hasNoQuery) {
    return true;
  }
  return false;
}
