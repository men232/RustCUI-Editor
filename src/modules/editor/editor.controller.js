import Editor from './Editor';
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!../../lib/snapsvg';

export function view($scope, $rootScope) {
	let container = $('#editor-container');
	let svg = Snap('#editor');

	$rootScope.editor = $scope.editor = new Editor(svg, container);

	$scope.editor.onUpdate(() => {
		if(!$scope.$$phase) $scope.$apply();
	});
}