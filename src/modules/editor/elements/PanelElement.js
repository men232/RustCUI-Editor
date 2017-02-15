import BaseElement from './BaseElement';
import RawImageComponent from '../components/RawImageComponent';

class PanelElement extends BaseElement {
	constructor(opts) {
		super(opts);

		this.parent = 'Hud';
		this.title  = 'PanelElement';
		this.components = [
			new RawImageComponent()
		];
	}
}

export default PanelElement;