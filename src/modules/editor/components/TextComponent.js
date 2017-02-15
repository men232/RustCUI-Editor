import BaseCompontent from './BaseCompontent';

class TextComponent extends BaseCompontent {
	constructor() {
		super();

		this.type     = 'UnityEngine.UI.Text';
		this.typeShort= 'Text';
		this.text     = 'Text';
		this.fontSize = 14;
		this.font     = 'RobotoCondensed-Bold.ttf';
		this.align    = 'UpperLeft';
		this.color    = [255, 255, 255, 255];
	}
}

export default TextComponent;