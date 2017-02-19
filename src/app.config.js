angular
	.module('app')
	.config(fn);

function fn($locationProvider, $httpProvider, $urlRouterProvider, $localStorageProvider, $qProvider) {
	$httpProvider.defaults.withCredentials = true;
	$urlRouterProvider.otherwise('/');
	$localStorageProvider.setKeyPrefix('rc.');
	$qProvider.errorOnUnhandledRejections(false);
}