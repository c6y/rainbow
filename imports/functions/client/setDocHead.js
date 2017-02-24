// Meteor stuff
import { Meteor } from 'meteor/meteor';
import { DocHead } from 'meteor/kadira:dochead';
import { FlowRouter } from 'meteor/kadira:flow-router';

/**
  * set the document title and meta tags
  */
export function setDocHead() {
  const route = FlowRouter.getRouteName();
  const slug = FlowRouter.getParam('slug');
  const page = FlowRouter.getParam('page');
  let query = FlowRouter.getQueryParam('q');
  const id = FlowRouter.getParam('_id');
  const site = Meteor.settings.public.ownership.title;

  if (query) {
    query += ':';
  } else {
    query = '';
  }

  DocHead.removeDocHeadAddedTags();

  // Set description: summary if on search results page
  if (route === 'pool' | route === 'edit') {
    const description = "eBoy database results for " + query + slug;
    DocHead.addMeta({ description: description });
    DocHead.addMeta({ "twitter:description": description });
    DocHead.addMeta({ property: 'og:description', content: description });
    DocHead.setTitle(query + slug + '/' + page + ' · ' + site);
  }

  // Set description: image id if on single spriteBox view
  if (route === "spriteBox") {
    const description = "eBoy database document: " + id;
    DocHead.addMeta({ description: description });
    DocHead.addMeta({ "twitter:description": description });
    DocHead.addMeta({ property: 'og:description', content: description });
    DocHead.setTitle(id + ' · ' + site);
  }
}
