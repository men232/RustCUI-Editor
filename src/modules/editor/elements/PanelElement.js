import BaseElement from './BaseElement';
import ImageComponent from '../components/ImageComponent';

class PanelElement extends BaseElement {
	constructor(opts) {
		super(opts);

		this.title  = 'PanelElement';
		this.components = [
			new ImageComponent()
		];
	}
}

export default PanelElement;