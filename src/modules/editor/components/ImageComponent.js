import BaseCompontent from './BaseCompontent';

class ImageComponent extends BaseCompontent {
	constructor() {
		super();

		this.type      = 'UnityEngine.UI.Image';
		this.typeShort = 'Image';
		this.sprite    = 'Assets/Content/UI/UI.Background.Tile.psd';
		this.material  = 'Assets/Icons/IconMaterial.mat';
		this.color     = [255, 255, 255, 255];
		this.imagetype = 'Simple';
	}
}

export default ImageComponent;