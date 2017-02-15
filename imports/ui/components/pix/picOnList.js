import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './picOnList.html';

// Components used
import './picSprite.js';
import './picSprite.html';
import './picMeta.js';
import './picMeta.html';
import '../edit/editLicense.js';
import '../edit/editLicense.html';
import '../edit/editCopyright.js';
import '../edit/editCopyright.html';
import '../edit/editBackColor.js';
import '../edit/editBackColor.html';
import '../edit/editTags.js';
import '../edit/editTags.html';
import '../edit/editProjects.js';
import '../edit/editProjects.html';
import '../edit/editMadeDate.js';
import '../edit/editMadeDate.html';
import '../edit/editFullFrame.js';
import '../edit/editFullFrame.html';
import '../edit/luckyBackColor.js';
import '../edit/luckyBackColor.html';
import '../edit/editAccess.js';
import '../edit/editAccess.html';

Template.picOnList.events({
  'click .deletePic'() {
    Meteor.call('eboypix.delete', this._id);
  }
});
