/**
 * carousel.js
 * 
 * Query banner objects to be rendered in the carousel with content from Contentful.
 * @Author Josh Hebb
 * 
 */
app.directive("carousel", function() {
	return { 
		restrict: 'E',
		replace: true,
        templateUrl: "src/views/carousel.html", 
        controller: function($scope, contentful) {
            contentful
                    // Query Contentful for 'banner' objects.
					.entries('content_type=banner').then(
						function (response) {
							if (response.data && response.data.items && response.data.items.length > 0) {
								$scope.banners = response.data.items;
							}
						}
					);
				}
        }
    }
);