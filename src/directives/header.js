/**
 * header.js
 * 
 * Render out the header. Simple :).
 * @Author Josh Hebb
 * 
 */
app.directive("header", function() {
	return {
        restrict: 'E',
        templateUrl: "src/views/header.html"
    }
});