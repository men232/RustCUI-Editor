export function main($rootScope, $scope, $state, $localStorage) {
	// Util
	$scope.$storage = $localStorage;
	$scope.$state   = $state;

	$rootScope.project = JSON.parse(require('raw!./info.json'));
}