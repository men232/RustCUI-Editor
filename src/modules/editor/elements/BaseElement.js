import RectTransformComponent from '../components/RectTransformComponent';

class BaseElement {
	constructor(opts) {
		this.name       = '#Element';
		this.title      = 'BaseElement';
		this.parent     = null;
		this.editor     = null;
		this.components = [];
		this.rect       = new RectTransformComponent(opts);
		this.childs     = [];
	}

	dispose() {
		for (let i = 0; i < this.components.length; i++) {
			this.components[i].dispose();
		}

		for (let i = 0; i < this.childs.length; i++) {
			this.childs[i].dispose();
		}
	}

	removeChild(index) {
		if (!this.childs[index]) return;

		this.childs[index].dispose();
		this.childs.splice(index, 1);

		this.update();
	}

	removeComponent(index) {
		if (!this.components[index]) return;

		this.components[index].dispose();
		this.components.splice(index, 1);
		this.update();
	}

	update(parent, editor) {
		this.parent = parent || this.parent;
		this.editor = editor || this.editor;

		if (this.parent) {
			this.rect.normalize(this.parent.rect);
			this.rect.recalcAnchor(this.parent.rect);
		}

		// update components
		for (var i = 0; i < this.components.length; i++) {
			let comp = this.components[i];

			if (!comp.svg.init) {
				comp.init(this, this.editor);
			}

			comp.update();
		}

		// update childs
		for (var i = 0; i < this.childs.length; i++) {
			this.childs[i].update(this, this.editor);
		}
	}
}

export default BaseElement;