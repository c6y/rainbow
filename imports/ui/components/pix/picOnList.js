import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './picOnList.html';

// Components used
import './picSprite.js';
import './picSprite.html';
import '../edit/editLicense.js';
import '../edit/editLicense.html';
import '../edit/editCopyright.js';
import '../edit/editCopyright.html';
import '../edit/editBackColor.js';
import '../edit/editBackColor.html';
import '../edit/editBackPattern.js';
import '../edit/editBackPattern.html';
import '../edit/editTags.js';
import '../edit/editTags.html';
import '../edit/editProjects.js';
import '../edit/editProjects.html';
import '../edit/editMadeDate.js';
import '../edit/editMadeDate.html';
import '../edit/editFullFrame.js';
import '../edit/editFullFrame.html';
import '../edit/editAntiAlias.js';
import '../edit/editAntiAlias.html';
import '../edit/luckyBackColor.js';
import '../edit/luckyBackColor.html';
import '../edit/editAccess.js';
import '../edit/editAccess.html';
import '../edit/editLink.js';
import '../edit/editLink.html';


Template.picOnList.events({
  'click .deletePic'() {
    Meteor.call('eboypix.delete', this._id);
  },
  'click #toggleMore'() {
    const showMore = Session.get(this._id);
    if (!showMore) {
      Session.set(this._id, true);
    } else {
      Session.set(this._id, false);
    }
  },
});

Template.picOnList.helpers({
  toggleMore() {
    const showMore = Session.get(this._id);
    if (!showMore) {
      return false;
    } else {
      return true;
    }
  },
  // uploadedByName() {
  //   if (this.uploadedBy) {
  //     // const uploadedBy = this.uploadedBy.username;
  //     const uploadedBy = this.uploadedBy.username;
  //     console.log('uploadedBy: ' + uploadedBy);
  //     return uploadedBy;
  //   }
  // },
});
