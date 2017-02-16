import BaseCompontent from './BaseCompontent';

class ButtonComponent extends BaseCompontent {
	constructor() {
		super();

		this.type      = 'UnityEngine.UI.Button';
		this.typeShort = 'Button';
		this.command   = '';
		this.close     = '';
		this.sprite    = 'Assets/Content/UI/UI.Background.Tile.psd';
		this.material  = 'Assets/Icons/IconMaterial.mat';
		this.color     = [78, 78, 78, 255];
		this.imagetype = 'Simple';
	}
}

export default ButtonComponent;