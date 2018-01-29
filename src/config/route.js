app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider

		// Default Home State. Displays home.html but has no associated controller.
		.state("home", {
			url: "/",
			templateUrl: "src/views/home.html",
		})

		// Products Landing Page. Pulls a 'Line of Products' from contentful.
		.state("products", {
			url: "/products/:productLine",
			templateUrl: "src/views/products.html",
			// Inline Controller. Can be defined in this file, or it's own file and referenced by name.
			controller: function ($scope, $stateParams, contentful) {
				contentful
					.entries('content_type=productLine&fields.urlSlug=' + $stateParams.productLine).then(
						function (response) {
							if (response.data && response.data.items && response.data.items.length > 0) {
								$scope.productLine = response.data.items[0].fields;
							}
						}
					);
				}
		})

		// Product Landing Page (Single Product) accessed from a Product Line (i.e. /headphones/beats-by-dre/)
		.state("product", {
			url: "/products/:productLine/:product",
			templateUrl: "src/views/product.html",
			controller: function ($scope, $stateParams, contentful) {
				contentful
					.entries('content_type=product&fields.urlSlug=' + $stateParams.product).then(
						function (response) {
							if (response.data && response.data.items && response.data.items.length > 0) {
								$scope.product = response.data.items[0].fields;
							}
						}
					);
				}
		})

		.state("singleProduct", {
			url: "/product/:product",
			templateUrl: "src/views/product.html",
			controller: function ($scope, $stateParams, contentful) {
				contentful
					.entries('content_type=product&fields.urlSlug=' + $stateParams.product).then(
						function (response) {
							if (response.data && response.data.items && response.data.items.length > 0) {
								$scope.product = response.data.items[0].fields;
							}
						}
					);
				}
		})

		.state("article", {
			url: "/article/:articleTitle",
			templateUrl: "src/views/article.html",
			controller: function ($scope, $stateParams, contentful) {
				contentful
					.entries('content_type=blogArticle&fields.urlSlug=' + $stateParams.articleTitle).then(
						function (response) {
							if (response.data && response.data.items && response.data.items.length > 0) {
								$scope.article = response.data.items[0].fields;
							}
						}
					);
			}
		})

		.state("location", {
			url: "/location/:locationTitle",
			templateUrl: "src/views/location.html",
			controller: function ($scope, $stateParams, contentful) {
				contentful
					.entries('content_type=event&fields.urlSlug=' + $stateParams.locationTitle) .then(
						function (response) {
							if (response.data && response.data.items && response.data.items.length > 0) {
								$scope.store = response.data.items[0].fields;
							}
						}
					);
			}
		});



}]);