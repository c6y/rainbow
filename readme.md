# Rainbow
A simple image database and client, optimized to reference and render small original pixel images (sprites). The client gets original sized images (1:1 pixel ratio) and scales and displays them sharp at any size (no antialiasing). Built with Meteor.js & MongoDB.

Rainbow is a rewrite of eboydb. Image files are not stored in the database anymore. Instead, the files can be located anywhere and are referenced as URLs.

## Notes for Admins
- see settings.json for some globals
- once everything is up and running, set new Admins, new Editors to false in settings

## Notes for Editors
- Pinned Post: add "pinned" to projects and post will be featured on home (one post only)
- Game Frame: adding "gfsub" to projects will publish to GF subscription
- Editor: click on the backColor label and get a new random color
