import BaseElement from './BaseElement';
import TextComponent from '../components/TextComponent';

class LabelElement extends BaseElement {
	constructor(opts) {
		super(opts);

		this.parent = 'Hud';
		this.components = [
			new TextComponent()
		];
	}
}

export default LabelElement;