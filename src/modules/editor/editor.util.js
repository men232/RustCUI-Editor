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

export function showExport(editor) {
	let $uibModal = $require('$uibModal');

	return $uibModal.open({
		templateUrl: 'editor.export.html',
		controller: controller.exportData,
		resolve: {
			editor: () => editor
		}
	});
}