import RectTransformComponent from './components/RectTransformComponent';

class Editor {
	constructor(svg, container) {
		this.svg        = svg;
		this.container  = container;
		this.background = "url('http://zaka-zaka.com/i/screen/rust_4.jpg')";
		this.isEditor   = true;
		this.rect = new RectTransformComponent({
			x: 0,
			y: 0,
			width: 1280,
			height: 720
		});
		this.childs = [];

		this.container.resizable({
			resize: (event, ui) => {
				this.updateSize(ui.size.width, ui.size.height);
			}
		});

		this.updateSize(this.rect.width, this.rect.height);
	}

	removeChild(index) {
		if (!this.childs[index]) return;

		this.childs[index].dispose();
		this.childs.splice(index, 1);
		this.update();
	}

	updateSize(width = this.rect.width, height = this.rect.height) {
		if (this.container.width() != width) this.container.width(width);
		if (this.container.height() != height) this.container.height(height);

		this.rect.width = width;
		this.rect.height = height;
		this.rect.originW = width;
		this.rect.originH = height;

		this.update();
	}

	onUpdate(cb) {
		if (!cb) return;
		this.onUpdate = cb.bind(this);
	}

	update() {
		for (var i = 0; i < this.childs.length; i++) {
			this.childs[i].update(this, this);
		}

		this.onUpdate();
	}
}

export default Editor;