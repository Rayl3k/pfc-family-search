/**
 * This file contains code to setup the SDK client and detect whether the user is logged in.
 */

// Setup the SDK client
var client = new FamilySearch({

  // A client ID for sandbox is obtained by registering with the FamilySearch developer's website
  client_id: 'a02j000000E5DXqAAN',

  // When using the JavaScript SDK, the redirect uri doesn't need to be a
  // page that actually exists, it just needs to be a page on the same domain.
  // Here we programmatically set the redirect uri to the base path of the
  // current domain. That helps the sample app work wherever it runs so
  // that we don't have to change this between development and production.
  redirect_uri: document.location.protocol + '//' + document.location.host + '/',

  // Store the access token in a cookie so that the user doesn't have to
  // login every time the page loads
  save_access_token: true,
  autoExpire: true,
  autoSigin: true,

  // Sandbox is the testing environment
  environment: 'sandbox'
});
