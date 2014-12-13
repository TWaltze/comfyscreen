app.controller('MoviesCtrl', function($scope, $rootScope, $state, Movies) {
	$rootScope.currentPage = $state.current.data.currentPage;

	$scope.title = 'Movies';
	$scope.predicate = 'score';	// Which field to order mediaList by

	Movies.getList().then(function(data) {
		$scope.mediaList = data;
	});
});