/**
 * footer.js
 * 
 * Render out the footer.
 * @Author Josh Hebb
 * 
 */
app.directive("footerSection", function() {
	return {
        restrict: 'E',
        templateUrl: "src/views/footer.html"
    }
});