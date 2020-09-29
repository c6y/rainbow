import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Session } from 'meteor/session';

import './cssBackInput.html';

// Template onCreated
Template.cssBackInput.onCreated(function() {
  // const defaultColor = Meteor.settings.public.colors.debug;
  // Session.set('backgroundCss', 'background-color: ' + defaultColor + ';');
  Session.set('backgroundCss', '');
  Session.set('backgroundName', '');
});

// Template helpers
Template.cssBackInput.helpers({
  cssCode() {
    const code = Session.get('backgroundCss');
    if (code) {
      return Session.get('backgroundCss');
    }
  },
  cssName() {
    return Session.get('backgroundName');
  },
  showCssPreview() {
    const code = Session.get('backgroundCss');
    if (!code) {
      return 'display:none';
    }
  },
});

// Template events
Template.cssBackInput.events({
  'submit .new-cssBack'(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name.value;
    const code = target.code.value;
    const cleanedCode = code.trim().replace(/\s+/g, ' ');
    Meteor.call('cssbacks.insert', name, cleanedCode);
    // Clear form
    target.name.value = '';
    target.code.value = '';
  },
  'keyup textarea': _.throttle(function(event, target) {
    if (event.target.value) {
      Session.set('backgroundCss', event.target.value);
    } else {
      // const defaultColor = Meteor.settings.public.colors.debug;
      Session.set('backgroundCss', '');
    }
  }, 600),
});
