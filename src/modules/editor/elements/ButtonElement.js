import BaseElement from './BaseElement';
import ButtonCompontent from '../components/ButtonComponent';
import LabelElement from '../elements/LabelElement';

class ButtonElement extends BaseElement {
	constructor(opts) {
		super(opts);

		this.parent = 'Hud';
		this.title  = 'ButtonElement';
		this.components = [
			new ButtonCompontent()
		];

		this.childs = [
			new LabelElement()
		];
	}
}

export default ButtonElement;