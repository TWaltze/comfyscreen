app.factory('Movies', function($rootScope, $injector, $q) {
	var list = $injector.get($rootScope.config.api.movies.list);
	var meta = $injector.get($rootScope.config.api.movies.meta);

	var movies = {};

	movies.getList = function() {
		return list.getList().then(function(movieList) {
			var ids = _.pluck(movieList, "imdb");
			var clone = _.cloneDeep(movieList);

			return meta.getMovieSummaries(ids).then(function(data) {

				_.forOwn(movieList, function(movie, index) {
					var info = data[movie.imdb];
					movie.type = "movie";

					movieList[index] = _.assign(movie, _.pick(info, [
						'title',
						'year',
						'release',
						'runtime',
						'genres',
						'overview',
						'summary',
						'thumbnail',
						'trailer'
					]));
				});

				// Return index'd array
				return _.values(movieList);
			});
		});
	}

	movies.getMovie = function(id) {
		return meta.getMovie(id).then(function(movie) {
			return movie;
		});
	}

	return movies;
});