import * as util from '../editor.util';

angular
	.module('app')
	.directive('rcElement', rcElement)
	.directive('rcElementsList', rcElementsList);

function rcElement() {
	/*@ngInject*/
	const controller = function ($scope) {
		$scope.util = util;
		$scope.onChange = () => {
			$scope.element.update();
		};
	};

	return {
		restrict: 'E',
		templateUrl: 'element.view.html',
		controller: controller,
		scope: {
			editor: '=',
			element: '='
		}
	};
}

function rcElementsList() {
	return {
		restrict: 'E',
		templateUrl: 'elements.list.html',
		scope: {
			editor: '=',
			parent: '='
		}
	};
}