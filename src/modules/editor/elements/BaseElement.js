import RectTransformComponent from '../components/RectTransformComponent';

class BaseElement {
	constructor(opts) {
		this.name       = '#Element';
		this.parent     = 'Hud';
		this.components = [];
		this.rect       = new RectTransformComponent(opts);
		this.childs     = [];
	}

	update(parent, editor) {
		this.parent = parent || this.parent;

		if (this.parent) {
			this.rect.normalize(this.parent.rect);
			this.rect.recalcAnchor(this.parent.rect);
		}

		// update components
		for (var i = 0; i < this.components.length; i++) {
			let comp = this.components[i];

			if (!comp.svg.init) {
				comp.init(this, editor);
			}

			comp.update();
		}

		// update childs
		for (var i = 0; i < this.childs.length; i++) {
			this.childs[i].update(this, editor);
		}
	}
}

export default BaseElement;