app.directive('loader', function() {
	return {
		restrict: "E",
		replace: true,
		templateUrl: "partials/templates/loader.html"
	};
});

app.directive('mediaTile', function($window) {
	return {
		restrict: "E",
		replace: true,
		scope: {
			tooltip: "=?",
			media: "="
		},
		templateUrl: "partials/templates/media-tiles.html",
		link: function(scope, element, attrs) {
			element.bind('mouseover', function() {
				// Distance between element and ride side of screen
				var rightOffset = $window.innerWidth - (element[0].offsetLeft + element[0].offsetWidth);

				// If there is no room for the tooltip on the right,
				// put it on the left.
				if(rightOffset < 200) {
					scope.$apply(function() {
						scope.leftSide = true;
					})
				}
			});
		}
	};
});

app.directive('leftPanel', function($rootScope) {
	return {
		restrict: "E",
		replace: true,
		transclude: true,
		templateUrl: "partials/templates/left-panel.html",
		// scope: {},
		link: function(scope, element, attrs) {
		}
	};
});

app.directive('toggleLeftPanel', function($rootScope) {
	return {
		restrict: 'A',
		scope: {
			info: "=toggleLeftPanel"
		},
		link: function(scope, element, attrs) {
			element.bind('click', function() {
				scope.$apply(function() {
					$rootScope.leftPanel.active = !$rootScope.leftPanel.active;
					$rootScope.leftPanel.content = scope.info;
				});
			});
		}
	}
});

app.directive('mediaPage', function(Movies) {
	return {
		restrict: "E",
		replace: true,
		templateUrl: "partials/pages/media-page.html",
		scope: {
			media: "="
		},
		link: function(scope, element, attrs) {
			scope.$watch('media', function(newV, oldV) {
				if(newV) {
					Movies.getMovie(scope.media).then(function(data) {
						console.log('[media]', data);
						scope.media = data;
					});
				}
			});
		}
	};
});