/**
 * header.js
 * 
 * Render out the header. Simple :).
 * @Author Josh Hebb
 * 
 */
angular.module("angular-contentful-starter").directive("navigation", function() {
	return {
        restrict: 'E',
        replace: true,
        templateUrl: "src/shared/navigation/navigation.html"
    }
}); 