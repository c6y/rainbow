import '/imports/startup/server';
import '/imports/startup/both';
import { WebApp } from 'meteor/webapp';

WebApp.rawConnectHandlers.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return next();
});
