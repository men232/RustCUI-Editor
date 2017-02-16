import _assign from 'lodash/assign';
import BaseCompontent from './BaseCompontent';

class RectTransformComponent extends BaseCompontent {
	constructor(opts) {
		super();

		this.type      = 'RectTransform';
		this.anchormin = [0.0, 0.0];
		this.anchormax = [1.0, 1.0];
		this.offsetmin = [0.0, 0.0];
		this.offsetmax = [1.0, 1.0];
		this.fillParent = false;

		// Of parent
		this.width = 100;
		this.height = 100;
		this.x = 25;
		this.y = 25;

		// Of editor (be calc)
		this.originX = 0;
		this.originY = 0;
		this.originW = 0;
		this.originH = 0;

		if (opts) {
			_assign(this, opts);
		}
	}

	normalize(parent) {
		// Size
		this.normalizeSize(parent);

		// Position
		this.normalizePosition(parent);
		this.normalizeOrigin(parent);
	}

	recalcAnchor(parent) {
		this.toAnchor(parent);
	}

	recalcMetric(parent) {
		let metric = this.toMetric(parent);
		_assign(this, metric);
	}

	toMetric(parent) {
		let [x, y] = this.toMetricPos(parent);
		let [width, height] = this.toMetricSize(parent);

		return {x, y, width, height};
	}

	normalizeSize(parent) {
		if (this.fillParent) {
			this.width = parent.width;
			this.height = parent.height;
		}

		this.originW = this.width;
		this.originH = this.height;
	}

	normalizeOrigin(parent) {
		this.originX = toDec(parent.originX + this.x);
		this.originY = toDec(parent.originY + this.y);
	}

	normalizePosition(parent) {
		if (this.fillParent) {
			this.x = 0;
			this.y = 0;
			return;
		}

		let maxX = parent.width - this.width;
		let maxY = parent.height - this.height;

		this.x = toDec(range(this.x, 0, maxX));
		this.y = toDec(range(this.y, 0, maxY));
	}

	toAnchor(parent) {
		this.anchormin[0] = toDec(this.x / parent.width, 3);
		this.anchormin[1] = toDec(1.0 - ((this.y + this.height) / parent.height), 3);

		this.anchormax[0] = toDec((this.x + this.width) / parent.width, 3);
		this.anchormax[1] = toDec(1.0 - (this.y / parent.height), 3);
	}

	toMetricPos(parent) {
		let x = toDec(parent.width * this.anchormin[0]);
		let y = toDec(parent.height - (parent.height * this.anchormax[1]));

		return [x, y];
	}

	toMetricSize(parent) {
		let width = toDec(parent.width - (parent.width * this.anchormin[1]));
		let height = toDec((parent.height * this.anchormax[0]));

		return [width, height];
	}

	static toDec(val, amount = 2) {
		let dc = [10, 100, 1000][amount-1];
		return Math.round(val * dc) / dc;
	}

	static range(value, min, max) {
		return Math.max(Math.min(value, max), min);
	}
}

const toDec = RectTransformComponent.toDec;
const range = RectTransformComponent.range;

export default RectTransformComponent;