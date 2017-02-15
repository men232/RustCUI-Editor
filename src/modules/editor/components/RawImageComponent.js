import BaseCompontent from './BaseCompontent';

class RawImageComponent extends BaseCompontent {
	constructor() {
		super();

		this.type      = 'UnityEngine.UI.RawImage';
		this.typeShort = 'RawImage';
		this.sprite    = 'Assets/Icons/rust.png';
		this.material  = '';
		this.url       = 'http://i.imgur.com/ry2Qew9.png';
		this.color     = [255, 255, 255, 255];
	}

	createSvgElement(editor) {
		return editor.svg.image(this.url, 0, 0, 50, 50);
	}

	updateImage() {
		this.svg.elem.attr({href: this.url});
	}

	update() {
		this.updateGeometry();
		this.updateColor();
		this.updateImage();
	}
}

export default RawImageComponent;