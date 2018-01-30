app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider

		// Default Home State. Displays home.html but has no associated controller.
		.state("home", {
			url: "/",
			templateUrl: "src/views/home.html",
			// Inline Controller. Can be defined in this file, or it's own file and referenced by name.
			controller: function ($scope, $stateParams, contentful) {
				// Query the product lines from Contentful.
				contentful	
					.entries('content_type=productLine').then(
						function (response) {
							if (response.data && response.data.items && response.data.items.length > 0) {
								$scope.productLines = response.data.items; } } );
				// Query the blog articles from Contentful.
				contentful
					.entries('content_type=blogArticle&limit=3&order=-sys.updatedAt').then(
						function (response) {
							if (response.data && response.data.items && response.data.items.length > 0) {
								$scope.articles = response.data.items; } } );
				// Query the locations (shops) from Contentful.
				contentful
					.entries('content_type=event&limit=5&order=fields.date').then(
						function (response) {
							if (response.data && response.data.items && response.data.items.length > 0) {
								$scope.stores = response.data.items; } } );
				}
		})

		// Products Landing Page. Pulls a 'Line of Products' from contentful.
		// i.e. /products/headphones
		.state("products", {
			url: "/products/:productLine",
			templateUrl: "src/views/products.html",
			controller: function ($scope, $stateParams, contentful) {
				// Query the Product Lines from Contentful.
				contentful
					.entries('content_type=productLine&fields.urlSlug=' + $stateParams.productLine).then(
						function (response) {
							if (response.data && response.data.items && response.data.items.length > 0) {
								$scope.productLine = response.data.items[0].fields; } } );
				}
		})

		// Product Landing Page (Single Product) accessed from a Product Line 
		// i.e. /products/headphones/beats-by-dre/
		.state("product", {
			url: "/products/:productLine/:product",
			templateUrl: "src/views/product.html",
			controller: function ($scope, $stateParams, contentful) {
				// Query the Product from Contentful.
				contentful
					.entries('content_type=product&fields.urlSlug=' + $stateParams.product).then(
						function (response) {
							if (response.data && response.data.items && response.data.items.length > 0) {
								$scope.product = response.data.items[0].fields; } } );
				}
		})

		// Product Landing Page (Single Product) accessed outside of the context of a product line
		// i.e. /product/beats-solo-3
		.state("singleProduct", {
			url: "/product/:product",
			templateUrl: "src/views/product.html",
			controller: function ($scope, $stateParams, contentful) {
				// Query the Product from Contentful
				contentful
					.entries('content_type=product&fields.urlSlug=' + $stateParams.product).then(
						function (response) {
							if (response.data && response.data.items && response.data.items.length > 0) {
								$scope.product = response.data.items[0].fields; } }
					);
				}
		})

		// Article Landing Page (single article).
		// i.e. /article/contentful-intro
		.state("article", {
			url: "/article/:articleTitle",
			templateUrl: "src/views/article.html",
			controller: function ($scope, $stateParams, contentful) {
				// Query the Article from Contentful.
				contentful
					.entries('content_type=blogArticle&fields.urlSlug=' + $stateParams.articleTitle).then(
						function (response) {
							if (response.data && response.data.items && response.data.items.length > 0) {
								$scope.article = response.data.items[0].fields; } } );
			}
		})

		// Location Landing Page (Store)
		// i.e. /location/pasadena
		.state("location", {
			url: "/location/:locationTitle",
			templateUrl: "src/views/location.html",
			controller: function ($scope, $stateParams, contentful) {
				// Query the Location from Contentful based on the URL Slug.
				contentful
					.entries('content_type=event&fields.urlSlug=' + $stateParams.locationTitle) .then(
						function (response) {
							if (response.data && response.data.items && response.data.items.length > 0) {
								$scope.store = response.data.items[0].fields; } } );
			}
		});

}]);