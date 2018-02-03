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
  "hc.marked",
  "contentfulConfig"
]);

// Configure Contentful with the space ID & API access token so we can query Contentful.
app.config([ 'contentfulProvider', 'contentfulConfig', function(contentfulProvider, contentfulConfig){

  // You can get your option values from Contentful (https://www.contentful.com/developers/docs/references/authentication/)
  contentfulProvider.setOptions({
      space: contentfulConfig.spaceId,
      accessToken: contentfulConfig.managementToken
  });
}]);

// Setup the marked provider for rendering Markdown.
app.config(['markedProvider', function (markedProvider) {
  markedProvider.setOptions({gfm: true});
}]);

// Send the user to the top of the page when we route them anywhere.
app.run(['$transitions', function ($transitions) {
  $transitions.onSuccess({}, function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
  })
}]);