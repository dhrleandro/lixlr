import Layer from "./entities/Layer";

export default class LayerManager {
  private layers: Layer[];
  private layersWidth: number;
  private layersHeight: number;

  constructor(layersWidth: number, layersHeight: number) {
    this.layers = [];
    this.layersWidth = layersWidth;
    this.layersHeight = layersWidth;
  }

  public createLayer(imageData?: ImageData) {

    if (!imageData)
      imageData = new ImageData(this.layersWidth, this.layersHeight);

    const name = 'Layer ' + this.layers.length;

    this.layers.push(new Layer(imageData, name, this.layersWidth, this.layersHeight));
  }

  public deleteLayer(index: number): boolean {
    try {
      this.layers = this.layers.splice(index, 1);
      return true;
    } catch (error) {
      return false;
    }
  }

  public getLayers(): Layer[] {
    const layers: Layer[] = [];
    this.layers.map(layer => layers.push(layer));

    return layers;
  }

  public getLayer(index: number): Layer {
    return this.layers[index];
  }

  public setVisible(index: number, visible: boolean): boolean {
    try {
      this.layers[index].setVisible(visible);
      return true;
    } catch (error) {
      return false;
    }
  }

  public setImageData(index: number, imageData: ImageData): boolean {
    try {
      this.layers[index].setImageData(imageData);
      return true;
    } catch (error) {
      return false;
    }
  }

  public getWidth(): number {
    return this.layersWidth;
  }

  public getHeight(): number {
    return this.layersHeight;
  }

  public setLayers(layers: Layer[]) {
    this.layers = layers;
  }
}
