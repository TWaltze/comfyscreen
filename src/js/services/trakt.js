app.factory('trakt', function($rootScope, $http, $q) {
	var api = $rootScope.config.services.trakt.url;
	var key = $rootScope.config.services.trakt.key;

	var movies = api + "movie";
	var shows = api + "show";

	var trakt = {};

	var format = function(movie) {
		var poster = movie.images.poster.replace(/\.jpg/, '-300.jpg');

		var MAX_SUMMARY_LENGTH = 200;
		var summary = movie.overview.substr(0, MAX_SUMMARY_LENGTH).trim();
		if(movie.overview.length > MAX_SUMMARY_LENGTH) {
			summary = summary + "...";
		}

		var basic = {
			imdb: movie.imdb_id,
			title: movie.title,
			year: movie.year,
			release: movie.released,
			runtime: movie.runtime,
			genres: movie.genres,
			overview: movie.overview,
			summary: summary,
			thumbnail: poster,
			trailer: movie.trailer
		}

		return basic;
	}

	trakt.getMovieSummaries = function(ids) {
		var deferred = $q.defer();

		$http({
			method: "JSONP",
			url: movies + "/summaries.json/" + key + "/" + ids.join(',') + "/full/?callback=JSON_CALLBACK"
		}).success(function(data) {
			var movies = data;

			movies.forEach(function(movie, index) {
				movies[index] = format(movie);
			});

			// Index by imdb id
			movies = _.indexBy(movies, 'imdb');

			deferred.resolve(movies);
		}).error(function() {
			deferred.reject("Some error.");
		});

		return deferred.promise;
	}

	trakt.getMovie = function(id) {
		var deferred = $q.defer();

		$http({
			method: "JSONP",
			url: movies + "/summary.json/" + key + "/" + id + "/?callback=JSON_CALLBACK"
		}).success(function(data) {
			var movie = format(data);

			console.log('[movie]', data);

			deferred.resolve(movie);
		}).error(function() {
			deferred.reject("Some error.");
		});

		return deferred.promise;
	}

	return trakt;
});