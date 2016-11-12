import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editProjects.html';

Template.editProjects.helpers({
  allProjects() {
    let projectsString = '';
    if (this.projects) {
      projectsString = String(this.projects);
    }
    const projectsStringSpaced = projectsString.replace(/,/g, ', ');
    return projectsStringSpaced;
  }
});

Template.editProjects.events({
  // Clean input in real-time
  'input .editProjects'(event, target) {
    let projectsString = event.target.value;
    // Replace multiple spaces with single space
    projectsString = projectsString.replace(/[\s]{2,}/gi, ' ');
    // Remove characters that don't match
    projectsString = projectsString.replace(/[^a-z0-9,\s!?&@'-]/gi, '');
    // Remove empty elements
    projectsString = projectsString.replace(/, *,/gi, ', ');
    // Replace commas with any number of spaces
    projectsString = projectsString.replace(/(\s*,\s*)/gi, ', ');
    // live update input value
    event.target.value = projectsString;
  },
  'blur .editProjects'(event, target) {
    // Restore projects input to original value
    // if user leaves input and does not press return
    let projectsString = '';
    if (this.projects) {
      projectsString = String(this.projects);
    }
    // for nice display, add a space after commas
    const projectsStringSpaced = projectsString.replace(/,/g, ', ');
    event.target.value = projectsStringSpaced;
  },
  'keyup .editProjects'(event, target) {
    if (event.keyCode === 13) { // return key submits new projects
      let projectsString = event.target.value;
      // Remove characters that don't match
      projectsString = projectsString.replace(/[^a-z0-9,\s!?&@'-]/gi, '');
      // Remove multiple spaces at start and end
      projectsString = projectsString.replace(/(\s+$)|(^\s+)/gi, '');
      // Remove multiple commas at start and end
      projectsString = projectsString.replace(/(,+$)|(^,+)/gi, '');
      // Remove multiple spaces
      projectsString = projectsString.replace(/[\s]{2,}/gi, '');
      // Remove empty elements
      projectsString = projectsString.replace(/, *,/gi, ',');
      // Remove whitespace after commas
      projectsString = projectsString.replace(/, */gi, ',');
      // Turn string into a projects array
      const projectsArray = projectsString.split(',');
      // Remove duplicates from array
      // (each value in a Set has to be unique)
      const uniqueProjectsArray = Array.from(new Set(projectsArray));

      Meteor.call('eboypix.updateProjects', this._id, uniqueProjectsArray);
      // Deselect input field
      event.target.blur();
    } else if (event.keyCode === 27) { // escape restores projects
      event.target.blur();
    }
  }
});
