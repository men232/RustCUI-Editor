import * as controller from './app.controller';

angular
	.module('app')
	.config(fn);

function fn($stateProvider) {
	// Define shared states
	$stateProvider
		.state('app', {
			abstract: true,
			controller: controller.main,
			templateProvider: ($q, $templateCache) => {
				return $q((resolve) => {
					// lazy load the view
					require.ensure([], () =>  {
						// Load shared templates
						$templateCache.put('header.html', require('./views/header.html'));
						$templateCache.put('footer.html', require('./views/footer.html'));
						$templateCache.put('sidebar.html', require('./views/sidebar.html'));

						// Load styles
						require('font-awesome/css/font-awesome.min.css');

						resolve(require('./views/content.html'));
					});
				});
			},
			resolve: {
				$title: () => 'Main'
			},
		});
}