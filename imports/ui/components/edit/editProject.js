import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editProject.html';

Template.editProject.helpers({
  initialInputWidth() {
    // Set initial width of input field based on length of string
    let len = 4;
    if (this.project) {
      len = Math.max(this.project.length, 4);
    }
    console.log('this.project: ' + this.project);
    return len;
  }
});

Template.editProject.events({
  'input .editProject'(event, target) {
    // Update width of input field as you type
    const len = event.target.value.length ? event.target.value.length : 4;
    const lengthStr = Math.max(len, 4);
    event.target.setAttribute('size', lengthStr);
  },
  'blur .editProject'(event, target) {
    // Restore project input to original value
    // if user leaves input and does not press return
    let len = 4;
    let proj = '';
    if (this.project) {
      len = Math.max(this.project.length, 4);
      proj = this.project;
    }
    // restore original project name
    event.target.value = proj;
    // Restore width of input field
    event.target.setAttribute('size', len);
  },
  'keyup .editProject'(event, target) {
    if (event.keyCode === 13) { // return key submits new project
      // Remove initial and trailing commas
      const projectClean = event.target.value.replace(/( *$)/gi, '');
      Meteor.call('eboypix.updateProject', this._id, projectClean);
      // Deselect input field
      event.target.blur();
    } else if (event.keyCode === 27) { // escape restores project
      event.target.blur();
    }
  }
});
