angular
	.module('app')
	.config(fn);

function fn($locationProvider, $httpProvider, $urlRouterProvider, $localStorageProvider) {
	$locationProvider.html5Mode(true);
	$httpProvider.defaults.withCredentials = true;
	$urlRouterProvider.otherwise('/');
	$localStorageProvider.setKeyPrefix('rc.');
}