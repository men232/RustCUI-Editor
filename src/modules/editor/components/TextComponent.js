import BaseCompontent from './BaseCompontent';

class TextComponent extends BaseCompontent {
	constructor() {
		super();

		this.type     = 'UnityEngine.UI.Text';
		this.typeShort= 'Text';
		this.text     = 'Text';
		this.fontSize = 14;
		this.font     = 'RobotoCondensed-Bold.ttf';
		this.align    = 'MiddleCenter';
		this.color    = [255, 255, 255, 255];
	}

	createSvgElement(editor) {
		return editor.svg.text(0, 0, this.text);
	}

	updateText() {
		this.svg.elem.attr({
			text: this.text,
			'font-size': this.fontSize,
			'font-family': "'Roboto Condensed Bold', sans-serif"
		});
	}

	update() {
		this.updateText();
		this.updateColor();
		this.updateGeometry();
	}

	updateGeometry() {
		let rect = this.getRect();
		let box = this.svg.elem.getBBox();

		// UpperLeft
		let x = rect.originX;
		let y = box.height + rect.originY;

		if (this.align === 'UpperRight') {
			x += rect.width - box.width;
		} else if (this.align === 'LowerLeft') {
			y = rect.height + rect.originY;
		} else if (this.align === 'LowerRight') {
			x += rect.width - box.width;
			y = rect.height + rect.originY;
		} else if (this.align === 'MiddleCenter') {
			x += (rect.width / 2) - (box.width / 2);
			y += (rect.height / 2) - (box.height / 2);
		} else if (this.align === 'MiddleLeft') {
			y += (rect.height / 2) - (box.height / 2);
		} else if (this.align === 'MiddleRight') {
			x += rect.width - box.width;
			y += (rect.height / 2) - (box.height / 2);
		}

		this.svg.elem.attr({x, y});
	}
}

export default TextComponent;