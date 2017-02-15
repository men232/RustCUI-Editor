import * as controller from './editor.controller';

export function showAddElement(parent) {
	let $uibModal = $require('$uibModal');

	return $uibModal.open({
		templateUrl: 'element.new.html',
		controller: controller.newElement,
		resolve: {
			parent: () => parent
		}
	});
}