angular.module("angular-contentful-starter").config(["$stateProvider", "$urlRouterProvider", "$locationProvider",
function ($stateProvider, $urlRouterProvider, $locationProvider) {

	$urlRouterProvider.otherwise("/");
	$stateProvider
		// Default Home State. Displays home.html but has no associated controller.
		.state("home", {
			url: "/",
			templateUrl: "src/views/home.html",
			// Inline Controller. Can be defined in this file, or it's own file and referenced by name.
			controller: function ($scope, $stateParams, contentful) {
				
				// Query the product lines from Contentful.
				contentful.entries('content_type=productLine').then(function(response) {
					$scope.productLines = handleContentfulListResponse(response);
				});
			
				// Query the blog articles from Contentful.
				contentful.entries('content_type=blogArticle&limit=3&order=-sys.updatedAt').then(function(response) {
					$scope.articles = handleContentfulListResponse(response);
				});
			}
		})

		// Product Landing Page (Single Product) accessed from a Product Line 
		// i.e. /products/headphones/beats-by-dre/
		.state("product", {
			url: "/products/:productLine/:product",
			templateUrl: "src/views/product.html",
			controller: function ($scope, $stateParams, contentful) {
				// Query the Product from Contentful.
				contentful.entries('content_type=product&fields.urlSlug=' + $stateParams.product).then(function(response) {
					$scope.product = handleContentfulSingleResponse(response);
				});
			}
		})

		// Product Landing Page (Single Product) accessed outside of the context of a product line
		// i.e. /product/beats-solo-3
		.state("singleProduct", {
			url: "/product/:product",
			templateUrl: "src/views/product.html",
			controller: function ($scope, $stateParams, contentful) {
				// Query the Product from Contentful
				contentful.entries('content_type=product&fields.urlSlug=' + $stateParams.product).then(function(response) {
					$scope.product = handleContentfulSingleResponse(response);
				});
			}
		})

		// Products Landing Page. Pulls a 'Line of Products' from contentful.
		// i.e. /products/headphones
		.state("products", {
			url: "/products/:productLine",
			templateUrl: "src/views/products.html",
			controller: function ($scope, $stateParams, contentful) {
				// Query the Product Lines from Contentful.
				contentful.entries('content_type=productLine&fields.urlSlug=' + $stateParams.productLine).then(function(response) {
					$scope.productLine = handleContentfulSingleResponse(response);
				});

				// Query the locations (shops) from Contentful.
				contentful.entries('content_type=event&limit=5&order=fields.date').then(function(response) {
					$scope.stores = handleContentfulListResponse(response);
				});
			}
		})

		// Article Landing Page (single article).
		// i.e. /article/contentful-intro
		.state("article", {
			url: "/article/:articleTitle",
			templateUrl: "src/views/article.html",
			controller: function ($scope, $stateParams, contentful) {
				// Query the Article from Contentful.
				contentful.entries('content_type=blogArticle&fields.urlSlug=' + $stateParams.articleTitle).then(function(response) {
					$scope.article = handleContentfulSingleResponse(response);
				});
			}
		})

		// Location Landing Page (Store)
		// i.e. /location/pasadena
		.state("location", {
			url: "/location/:locationTitle",
			templateUrl: "src/views/location.html",
			controller: function ($scope, $stateParams, contentful) {
				// Query the Location from Contentful based on the URL Slug.
				contentful.entries('content_type=event&fields.urlSlug=' + $stateParams.locationTitle).then(function(response) {
					$scope.store = handleContentfulSingleResponse(response);
				});
			}
		});

		/**
		 * Handle a Contentful response when expecting a list of items.
		 * @param {*} response contentful JSON response.
		 */
		function handleContentfulListResponse(response) {
			if (response.data && response.data.items && response.data.items.length > 0) {
				return response.data.items;
			}
	
			return null;
		}

		/**
		 * Handle a Contentful response when expecting a single item.
		 * @param {*} response contentful JSON response.
		 */
		function handleContentfulSingleResponse(response) {
			if (response.data && response.data.items && response.data.items.length > 0) {
				return response.data.items[0].fields;
			}

			return null;
		}

}]);