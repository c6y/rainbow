# Rainbow
A simple image database and client, optimized to store and render small original pixel images (sprites). The client gets original sized images (1:1 pixel ratio) and scales and displays them sharp at any size (no antialiasing). Built with Meteor.js.

Rainbow is a rewrite of eboydb. Image files are not stored in the database anymore. Instead, the files can be located anywhere and are referenced as URLs.

## Notes for Admins
- see settings.json for some globals
- once everything is up and running, set new Admins, new Editors to false in settings

## Notes for Editors
- add project: "pinned" to the post that should be featured on the homepage
- add project: "gfsub" for Game Frame subscription posts
