import 'angular';
import 'angular-sanitize';
import 'angular-ui-sortable';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-ui-router-title';
import 'ngstorage';

import homer from './lib/homer';

angular
	.module('app', [
		'ui.router',
		'ui.router.title',
		'ui.bootstrap',
		'ui.sortable',
		'ngStorage',
		'ngSanitize'
	])
	.run(run);

function run($rootScope, $state) {
	// Event listen
	$rootScope.$on('$stateChangeError', (e, toState, toParams, fromState, fromParams, err) => {
		if (!err.redirectTo && fromState.name === "") {
			err.redirectTo = 'app.main';
		}

		console.error('State change error:', err.message);

		if (err.redirectTo) {
			console.info('redirect ->', err.redirectTo);
			$state.go(err.redirectTo);
		}
	});

	$rootScope.$on('$stateChangeSuccess', () => $('.splash').css('display', 'none'));
	$rootScope.$on('$stateChangeStart', () => $('.splash').css('display', 'initial'));
	$rootScope.$on('$viewContentLoaded', () => homer.fixWrapperHeight());

	// Final
	console.log('App launched...');
}

// Error handling
angular
	.module('app')
	.factory('$exceptionHandler', () => errorHandler);

function errorHandler(err) {
	swal.error('Oops', err.message);
	console.error(err);
}