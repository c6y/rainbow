import { Template } from 'meteor/templating';

import './applayout.html';

Template.applayout.onCreated(function appLayoutOnCreated() {
  this.subscribe('pix.public');
  this.subscribe('colors.public');
});
