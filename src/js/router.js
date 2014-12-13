/*
app.config(function($routeProvider) {
	$routeProvider.when('/', {
		redirectTo: "/movies"
	}).when('/movies', {
		templateUrl: "partials/pages/media-stream.html",
		controller: "MoviesCtrl"
	}).when('/tv', {
		templateUrl: "partials/pages/media-stream.html",
		controller: "TvCtrl"
	}).when('/favorites', {
		templateUrl: "partials/pages/media-stream.html",
		controller: "FavoritesCtrl"
	})
});
*/

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/movies");

	$stateProvider.state('movies', {
		url: '/movies',
		views: {
			"main": {
				templateUrl: "partials/pages/media-stream.html",
				controller: "MoviesCtrl"
			}
		},
		data: {
			currentPage: "movies"
		}
	}).state('shows', {
		url: '/shows',
		views: {
			"main": {
				templateUrl: "partials/pages/media-stream.html",
				controller: "ShowsCtrl"
			}
		},
		data: {
			currentPage: "shows"
		}
	}).state('favorites', {
		url: '/favorites',
		views: {
			"main": {
				templateUrl: "partials/pages/media-stream.html",
				controller: "FavoritesCtrl"
			}
		},
		data: {
			currentPage: "favorites"
		}
	})
});