/**
 * AngularJS Starter Kit
 * @author Josh Hebb
 * https://github.com/joshhebb/angularjs-contentful-starter
 * 
 */

// Initialize the Angular Module and load any libraries.
var app = angular.module("angular-contentful-starter", [
	"ui.router",
  "contentful", 
  "ngMap",
  "ngSanitize",
  "hc.marked"
]); 


// Configure Contentful with the space ID & API access token so we can query Contentful.
// You can get your option values from Contentful (https://www.contentful.com/developers/docs/references/authentication/)

/**
 * Configure the Contentful Provider. 
 * The values for the space ID and management token come from contentful-config.js which is created when you created the project
 * via 'npm run init'. Update the values in package.json for them to persist through builds.
 */
angular.module("angular-contentful-starter").config(['contentfulProvider', 'spaceId', 'managementToken', 
function(contentfulProvider, spaceId, managementToken){
  contentfulProvider.setOptions({
      space: spaceId,
      accessToken: managementToken
  });
}]);

// Setup the marked provider for rendering Markdown.
angular.module("angular-contentful-starter").config(['markedProvider', 
function (markedProvider) {
  markedProvider.setOptions({gfm: true});
}]);

// Send the user to the top of the page when we route them anywhere.
angular.module("angular-contentful-starter").run(['$transitions', 'contentful', 
function ($transitions, contentful) {
  $transitions.onSuccess({}, function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
  })
}]);


