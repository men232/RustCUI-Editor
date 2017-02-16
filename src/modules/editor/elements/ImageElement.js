import BaseElement from './BaseElement';
import RawImageComponent from '../components/RawImageComponent';

class ImageElement extends BaseElement {
	constructor(opts) {
		super(opts);

		this.parent = 'Hud';
		this.title  = 'ImageElement';
		this.components = [
			new RawImageComponent()
		];
	}
}

export default ImageElement;