import APP_UTIL from './app.util';

/*@ngInject*/
export function main($rootScope, $scope, $state, $localStorage) {
	// Util
	$scope.$storage = $localStorage;
	$scope.$state   = $state;

	$rootScope.project = JSON.parse(require('raw!./info.json'));
	$rootScope.util = APP_UTIL;
	$rootScope.app_util = APP_UTIL;
}