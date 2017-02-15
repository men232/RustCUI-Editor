import PanelElement from './elements/PanelElement';
import RectTransformComponent from './components/RectTransformComponent';

class Editor {
	constructor(svg, container) {
		this.svg = svg;
		this.container = container;
		this.background = '#333';
		this.rect = new RectTransformComponent({
			x: 0,
			y: 0,
			width: 1280,
			height: 720
		});
		this.childs = [
			new PanelElement({
				x: 5,
				y: 5,
				width: 250,
				height: 250
			}),
			new PanelElement({
				x: 350,
				y: 15,
				width: 75,
				height: 75
			}, this.rect)
		];

		this.container.resizable({
			resize: (event, ui) => {
				this.updateSize(ui.size.width, ui.size.height);
			}
		});

		let p = new PanelElement({
			x: 5,
			y: 5,
			width: 75,
			height: 75
		}, this.childs[0].rect);

		p.components[0].color[0] = 0;
		this.childs[0].childs.push(p);

		this.updateSize(this.rect.width, this.rect.height);
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