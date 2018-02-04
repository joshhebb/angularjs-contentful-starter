/**
 * footer.js
 * 
 * Render out the footer.
 * @Author Josh Hebb
 * 
 */
angular.module("angular-contentful-starter").directive("footerSection", function() {
	return {
        restrict: 'E',
        replace: true,
        templateUrl: "src/shared/footer/footer.html"
    }
});