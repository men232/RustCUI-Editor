import BaseElement from './BaseElement';
import TextComponent from '../components/TextComponent';

class LabelElement extends BaseElement {
	constructor(opts = {}) {
		super(opts);

		this.title  = 'LabelElement';
		this.components = [
			new TextComponent()
		];

		this.controls.childs     = false;
		this.controls.fillParent = false;
		this.controls.size = false;
	}

	onUpdate(parent) {
		if (parent.title === 'ButtonElement') {
			this.rect.fillParent = true;
			this.controls.position = false;
		}
	}
}

export default LabelElement;