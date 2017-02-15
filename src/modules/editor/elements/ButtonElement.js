import BaseElement from './BaseElement';
import ButtonCompontent from '../components/ButtonComponent';

class ButtonElement extends BaseElement {
	constructor(opts) {
		super(opts);

		this.parent = 'Hud';
		this.title  = 'ButtonElement';
		this.components = [
			new ButtonCompontent()
		];
	}
}

export default ButtonElement;