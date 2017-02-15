angular
	.module('app')
	.directive('rcComponent', rcComponent);

function rcComponent() {
	/*@ngInject*/
	const controller = function ($scope) {
		$scope.onChange = () => {
			$scope.component.update();
		};
	};

	return {
		restrict: 'E',
		templateUrl: 'component.view.html',
		controller: controller,
		scope: {
			editor: '=',
			component: '='
		}
	};
}