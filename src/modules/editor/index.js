import './editor.less';
import './element.directive';
import './component.directive';
import * as controller from './editor.controller';

angular
	.module('app')
	.config(fn);

function fn($stateProvider) {
	// Define shared states
	$stateProvider
		.state('app.editor', {
			url: '/editor',
			controller: controller.view,
			templateProvider: ($q, $templateCache) => {
				return $q((resolve) => {
					require.ensure([], () =>  {
						$templateCache.put('editor.sidebar.html', require('./editor.sidebar.html'));
						$templateCache.put('element.view.html', require('./element.view.html'));
						$templateCache.put('elements.list.html', require('./elements.list.html'));
						$templateCache.put('component.view.html', require('./component.view.html'));

						// resizable
						require('jquery-ui/ui/widgets/resizable');
						require('jquery-ui/themes/base/resizable.css');

						// sortable
						require('jquery-ui/ui/widgets/sortable');

						resolve(require('./editor.view.html'));
					});
				});
			},
			resolve: {
				$title: () => 'Editor'
			},
			data: {
				sidebarPath: 'editor.sidebar.html'
			}
		});
}