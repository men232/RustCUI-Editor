import APP_UTIL from '../../app.util';

import './editor.less';
import './elements/element.directive';
import './components/component.directive';
import * as controller from './editor.controller';
import * as util from './editor.util';

// Register new util lib
APP_UTIL.editor = util;

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
						$templateCache.put('element.view.html', require('./elements/element.view.html'));
						$templateCache.put('element.new.html', require('./elements/element.new.html'));
						$templateCache.put('elements.list.html', require('./elements/elements.list.html'));
						$templateCache.put('component.view.html', require('./components/component.view.html'));

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