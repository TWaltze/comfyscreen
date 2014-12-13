app.factory('yts', function($rootScope, $http, $q) {
	var api = $rootScope.config.services.yts.url;
	var yts = {};

	var format = function(movie) {
		var largeCover = movie.CoverImage.replace(/_med\./, '_large.');
		// var imdb = movie.ImdbCode.replace('tt', '');

		return {
			imdb: movie.ImdbCode,
			title: movie.MovieTitleClean.replace(/\([^)]*\)|1080p|DIRECTORS CUT|EXTENDED|UNRATED|3D|[()]/g, ''),
			year: movie.MovieYear,
			score: movie.MovieRating,
			genres: [movie.Genre],
			thumbnail: largeCover,
			quality: movie.Quality,
			torrent: movie.TorrentUrl
		}
	}

	var removeDuplicates = function(array) {
		var list = [];

		// Remove all duplicates with a preference for 1080p over 720p
		array.forEach(function(movie, index) {
			if(list[movie.ImdbCode] != null) {
				if(movie.Quality == "1080p") {
					list[movie.ImdbCode] = movie;
				}
			} else {
				list[movie.ImdbCode] = movie;
			}
		});

		// Convert from key'd object to indexed array
		return _.values(list);
	}

	yts.getList = function() {
		var deferred = $q.defer();

		$http.get(api + "/list").success(function(data) {
			var movies = removeDuplicates(data.MovieList);

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

	return yts;
});