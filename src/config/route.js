app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state("index", {
			url: "/",
			templateUrl: "src/route/index.html",
		})

		.state("info", {
			url: "/information",
			templateUrl: "src/route/info.html",
		})

		.state("products", {
			url: "/products/:productLine",
			templateUrl: "src/route/products.html",
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

		.state("product", {
			url: "/products/:productLine/:product",
			templateUrl: "src/route/product.html",
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
			templateUrl: "src/route/article.html",
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

		.state("event", {
			url: "/event/:eventTitle",
			templateUrl: "src/route/event.html",
			controller: function ($scope, $stateParams, contentful) {
				contentful
					.entries('content_type=event&fields.urlSlug=' + $stateParams.eventTitle) .then(
						function (response) {
							if (response.data && response.data.items && response.data.items.length > 0) {
								$scope.event = response.data.items[0].fields;
							}
						}
					);
			}
		});



}]);