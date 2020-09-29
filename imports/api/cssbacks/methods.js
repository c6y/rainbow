// Meteor stuff
import { Meteor } from 'meteor/meteor';

// Collections
import { CssBacks } from './cssbacks.js';

// Functions
import { cleanString } from '../../functions/server/cleanString.js';
import { isAdminOrEditor, isAdmin } from '../../functions/server/isUser.js';

Meteor.methods({
  'cssbacks.insert'(name, code, tags) {
    if (isAdminOrEditor()) {
      const cssBackName = cleanString(name);
      CssBacks.insert({
        name: cssBackName,
        code: code,
        createdAt: new Date(),
      });
      console.log(cssBackName + ': inserted to CssBacks');
    }
  },
  'cssbacks.deleteAll'() {
    if (isAdmin()) {
      CssBacks.remove({});
      console.log('removed all documents from CssBacks');
    }
  },
  'cssback.delete'(id) {
    if (isAdminOrEditor()) {
      CssBacks.remove(id);
      console.log(id + ': removed from CssBacks');
    }
  },
  'cssback.update'(taskId, name, code) {
    if (isAdminOrEditor()) {
      CssBacks.update(
          taskId,
          { $set:
            {
              name: name,
              code: code,
            },
          },
      );
      console.log(taskId + ': backPattern updated: "' + code + '"');
    }
  },
});
