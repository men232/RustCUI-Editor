import Editor from './Editor';
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!../../lib/snapsvg';

import ButtonElement from './elements/ButtonElement';
import LabelElement from './elements/LabelElement';
import PanelElement from './elements/PanelElement';
import ImageElement from './elements/ImageElement';

export function view($scope, $rootScope) {
	let container = $('#editor-container');
	let svg = Snap('#editor');

	$rootScope.editor = $scope.editor = new Editor(svg, container);

	$scope.editor.onUpdate(() => {
		if(!$scope.$$phase) $scope.$apply();
	});
}

export function newElement($scope, $uibModalInstance, parent) {
	// Export to scope interface
	$scope.close = $uibModalInstance.close.bind($uibModalInstance);

	$scope.model = {
		name: '',
		type: 0
	};

	$scope.types = ['Button', 'Text / Label', 'Panel', 'Image'];

	$scope.add = () => {
		$scope.close();

		let child;

		switch($scope.model.type) {
			case 0:
				child = new ButtonElement();
				break;

			case 1:
				child = new LabelElement();
				break;

			case 2:
				child = new PanelElement();
				break;

			case 3:
				child = new ImageElement();
				break; 
		}

		if (!child) return;

		parent.childs.push(child);
		parent.update();
	};
}