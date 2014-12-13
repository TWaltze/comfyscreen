app.controller('ShowsCtrl', function($scope, $rootScope, $state) {
	$rootScope.currentPage = $state.current.data.currentPage;

	$scope.title = 'TV Shows';

	$scope.login = function() {
	}
});