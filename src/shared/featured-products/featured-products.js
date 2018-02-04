/**
 * featured-products.js
 * 
 * Render out a list of featured products.
 * @Author Josh Hebb
 * 
 */
angular.module("angular-contentful-starter").directive("featuredProducts", function() {
	return {
        restrict: 'E',
        replace: true,
        scope: {
            products: '='
        },
        templateUrl: "src/shared/featured-products/featured-products.html"
    }
});