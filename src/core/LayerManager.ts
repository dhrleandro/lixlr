import Layer from "./entities/Layer";

export default class LayerManager {
  private layers: Layer[];
  private lastLayerId: number;
  private layersWidth: number;
  private layersHeight: number;

  constructor(layersWidth: number, layersHeight: number) {
    this.layers = [];
    this.layersWidth = layersWidth;
    this.layersHeight = layersWidth;
    this.lastLayerId = 0;
  }

  private getLayerIndex(id: number): number {
    let arrayIndex = -1;
    this.layers.forEach((layer, index) => {
      if (layer.getId() === id) {
        arrayIndex = index;
      }
    });

    return arrayIndex;
  }

  public createLayer(imageData?: ImageData) {

    if (!imageData)
      imageData = new ImageData(this.layersWidth, this.layersHeight);

    const id = this.lastLayerId + 1;
    this.lastLayerId = id;

    const name = 'Layer ' + id;
    this.layers.push(new Layer(imageData, id, name, this.layersWidth, this.layersHeight));
  }

  public deleteLayer(id: number): void {
    this.layers = this.layers.filter(layer => layer.getId() !== id);
  }

  public getLayers(): Layer[] {
    const layers: Layer[] = [];
    this.layers.map(layer => layers.push(layer));

    return layers;
  }

  public getLayer(id: number): Layer {
    const index = this.getLayerIndex(id);
    return this.layers[index];
  }

  public setVisible(id: number, visible: boolean): boolean {
    const index = this.getLayerIndex(id);
    console.log(index, this.layers);
    try {
      this.layers[index].setVisible(visible);
      return true;
    } catch (error) {
      return false;
    }
  }

  public setImageData(id: number, imageData: ImageData): boolean {
    const index = this.getLayerIndex(id);
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
    this.layers = [];
    layers.forEach((layer, index) => {
      layer.setId(index + 1);
      this.layers.push(layer);
    });

    this.lastLayerId = this.layers[this.layers.length - 1].getId();
  }

  public getLastLayerId(): number {
    return this.lastLayerId;
  }
}
