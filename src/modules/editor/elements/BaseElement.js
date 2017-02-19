import guid from '../../../lib/guid';
import RectTransformComponent from '../components/RectTransformComponent';

class BaseElement {
	constructor(opts) {
		this.name       = '';
		this.title      = 'BaseElement';
		this.parent     = null;
		this.editor     = null;
		this.components = [];
		this.rect       = new RectTransformComponent(opts);
		this.childs     = [];
		this.controls = {
			position: true,
			anchor: true,
			childs: true,
			fillParent: true
		};
	}

	dispose() {
		for (let i = 0; i < this.components.length; i++) {
			this.components[i].dispose();
		}

		for (let i = 0; i < this.childs.length; i++) {
			this.childs[i].dispose();
		}
	}

	toJSON(list) {
		let parent = 'Hud';
		let components = [];

		if (this.parent && !this.parent.isEditor) {
			parent = this.parent.name;
		}

		for (var i = 0; i < this.components.length; i++) {
			components.push(this.components[i].toJSON());
		}

		components.push(this.rect.toJSON());

		let data = {
			name: this.name,
			parent,
			components
		};

		list.push(data);

		for (var i = 0; i < this.childs.length; i++) {
			this.childs[i].toJSON(list);
		}
	}

	toggleFill() {
		this.rect.fillParent = !this.rect.fillParent;

		if (!this.rect.fillParent) {
			this.rect.width = 100;
			this.rect.height = 100;
		}

		this.update();
	}

	removeChild(index) {
		if (!this.childs[index]) return;

		this.childs[index].dispose();
		this.childs.splice(index, 1);

		this.update();
	}

	drag(e) {
		if (this.rect.fillParent && this.parent && !this.parent.isEditor) {
			this.parent.drag(e);
		}

		let rect = this.rect;

		rect.x = rect.x + e.movementX;
		rect.y = rect.y + e.movementY;

		rect.normalizePosition(this.parent.rect);
		this.parent.update();
		this.editor.onUpdate();
	}

	removeComponent(index) {
		if (!this.components[index]) return;

		this.components[index].dispose();
		this.components.splice(index, 1);
		this.update();
	}

	onUpdate() {}

	update(parent, editor) {
		if (this.name === '') {
			this.name = guid();
		}

		this.parent = parent || this.parent;
		this.editor = editor || this.editor;

		this.onUpdate(this.parent, editor);

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