/**
 * header.js
 * 
 * Render out the header. Simple :).
 * @Author Josh Hebb
 * 
 */
app.directive("navigation", function() {
	return {
        restrict: 'E',
        replace: true,
        templateUrl: "src/views/navigation.html"
    }
}); 