import BaseElement from './BaseElement';
import TextComponent from '../components/TextComponent';

class LabelElement extends BaseElement {
	constructor(opts = {}) {
		super(opts);

		this.parent = 'Hud';
		this.title  = 'LabelElement';
		this.components = [
			new TextComponent()
		];

		this.controls.childs     = false;
		this.controls.fillParent = false;
	}

	onUpdate(parent) {
		if (!parent.isEditor) {
			this.rect.fillParent = true;
			this.controls.size = false;
		}
	}
}

export default LabelElement;