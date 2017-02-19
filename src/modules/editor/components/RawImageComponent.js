import BaseCompontent from './BaseCompontent';

class RawImageComponent extends BaseCompontent {
	constructor() {
		super();

		this.type      = 'UnityEngine.UI.RawImage';
		this.typeShort = 'RawImage';
		this.sprite    = 'Assets/Icons/rust.png';
		this.material  = '';
		this.url       = 'http://www.rigormortis.be/wp-content/uploads/rust-icon-512.png';
		this.color     = [255, 255, 255, 255];
	}

	toJSON() {
		return {
			type: this.type,
			color: this.toRAWColor(this.color),
			url: this.url,
		};
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