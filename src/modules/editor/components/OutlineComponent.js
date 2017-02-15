import BaseCompontent from './BaseCompontent';

class OutlineComponent extends BaseCompontent {
	constructor() {
		super();

		this.type            = 'UnityEngine.UI.Outline';
		this.color           = [255, 255, 255, 255];
		this.distance        = [1.0, -1.0];
		this.useGraphicAlpha = false;
	}
}

export default OutlineComponent;