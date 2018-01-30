/**
 * featured-products.js
 * 
 * Render out a list of featured products.
 * @Author Josh Hebb
 * 
 */
app.directive("featuredProducts", function() {
	return {
        restrict: 'E',
        replace: true,
        scope: {
            products: '='
        },
        templateUrl: "src/views/featured-products.html"
    }
});