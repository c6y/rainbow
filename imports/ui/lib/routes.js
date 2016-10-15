// import { FlowRouter } from 'meteor/kadira:flow-router';
// // import { BlazeLayout } from 'meteor/kadira:blaze-layout';
//
// // FlowRouter.route('/terms', {
// //   action() {
// //     console.log("Okay, we're on the Terms of Service page!");
// //   }
// // });
//
// // FlowRouter.route('/', {
// //   triggersEnter: [function(context, redirect) {
// //     redirect('/pool/everything/1');
// //   }]
// // });
//
// // FlowRouter.route('/pool', {
// //   triggersEnter: [function(context, redirect) {
// //     redirect('/pool/everything/1');
// //   }]
// // });
//
// FlowRouter.route('/pool/:slug/:page', {
//   action() {
//     console.log("pool route!");
//     // BlazeLayout.render('applicationLayout', {
//     //   header: 'poolHeader',
//     //   main: 'pool'
//     // });
//   },
//   name: 'pool'
// });
//
// FlowRouter.route('/colors', {
//   name: 'colors',
//   action() {
//     console.log("color route!");
//     // BlazeLayout.render('applicationLayout', { main: 'colors' });
//   }
// });
//
// // FlowRouter.route('/adddoc', {
// //   action() {
// //     BlazeLayout.render('applicationLayout', { main: 'addDoc' });
// //   },
// //   name: 'addDoc'
// // });
// //
// // FlowRouter.route('/spritebox/:_id/:boxsize', {
// //   action() {
// //     BlazeLayout.render('applicationLayout', { main: 'spriteBox' });
// //   },
// //   name: 'spriteBox'
// // });
// //
// // FlowRouter.route('/docedit/:_id', {
// //   action() {
// //     BlazeLayout.render('applicationLayout', { main: 'docEdit' });
// //   },
// //   name: 'docEdit'
// // });
// //
// // FlowRouter.route('/login', {
// //   action() {
// //     BlazeLayout.render('applicationLayout', { main: 'login' });
// //   },
// //   name: 'login'
// // });
// //
// // FlowRouter.route('/tags', {
// //   action() {
// //     BlazeLayout.render('applicationLayout', { main: 'tags' });
// //   },
// //   name: 'tags'
// // });
// //
// // FlowRouter.route('/relations', {
// //   action() {
// //     BlazeLayout.render('applicationLayout', { main: 'relations' });
// //   },
// //   name: 'relations'
// // });
// //
// // FlowRouter.notFound = {
// //   action() {
// //     BlazeLayout.render('applicationLayout', { main: 'notFound' });
// //   }
// // };
// //
// // FlowRouter.route('/docrender/:_id', {
// //   action() {
// //     BlazeLayout.render('applicationLayout', { main: 'docRender' });
// //   },
// //   name: 'docRender'
// // });
