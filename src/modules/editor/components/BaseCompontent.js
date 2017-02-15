class BaseCompontent {
	constructor() {
		this.element = null;
		this.type    = '';
		this.svg = {
			init: false,
			elem: null
		};
	}

	toRGBA(arr) {
		if (arr.length > 3) {
			let val = arr.slice(0, 3);
			return `rgba(${val.join(',')},${arr[3] / 255})`;
		}

		return `rgb(${arr.join(',')})`;
	}

	createSvgElement(editor) {
		return editor.svg.rect(0, 0 , 50, 50);
	}

	init(element, editor) {
		this.element = element;
		this.svg.elem = this.createSvgElement(editor);
		this.svg.elem.component = this;
		this.svg.init = true;

		this.svg.elem.drag((dx, dy, x, y, e) => {
			let rect = element.rect;

			rect.x = rect.x + e.movementX;
			rect.y = rect.y + e.movementY;

			rect.normalizePosition(element.parent.rect);
			element.update();
			editor.onUpdate();
		});
	}

	getRect() {
		return this.element.rect;
	}

	updateGeometry() {
		let rect = this.getRect();

		this.svg.elem.attr({
			x: rect.originX,
			y: rect.originY,
			width: rect.originW,
			height: rect.originH
		});
	}

	updateColor() {
		this.svg.elem.attr({
			fill: this.toRGBA(this.color)
		});
	}

	update() {
		this.updateGeometry();
		this.updateColor();
	}
}

export default BaseCompontent;