app.controller('FavoritesCtrl', function($scope, $rootScope, $state) {
	$rootScope.currentPage = $state.current.data.currentPage;

	$scope.title = 'Your Favorites';

	$scope.login = function() {
	}
});