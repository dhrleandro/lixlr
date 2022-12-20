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

  public getLayerIndex(id: number): number {
    let arrayIndex = -1;
    this.layers.forEach((layer, index) => {
      if (layer.getId() === id) {
        arrayIndex = index;
      }
    });

    return arrayIndex;
  }

  public createLayer() {
    const name = 'Layer ' + (this.layers.length + 1);
    const newLayer = new Layer(name, this.layersWidth, this.layersHeight);
    this.lastLayerId = newLayer.getId();
    this.layers.push(newLayer);
  }

  public deleteLayer(id: number): void {
    this.layers = this.layers.filter(layer => layer.getId() !== id);
  }

  public getLayer(id: number): Layer {
    const index = this.getLayerIndex(id);
    return this.layers[index];
  }

  public getLayers(): Layer[] {
    const layers: Layer[] = [];
    this.layers.map(layer => layers.push(layer));

    return layers;
  }

  public setLayers(layers: Layer[]) {
    this.layers = [];
    let sercureId = 0;
    layers.forEach(layer => {
      sercureId += layer.getId();
      this.layers.push(layer);
    });

    this.lastLayerId = sercureId;
  }

  public setVisible(id: number, visible: boolean): boolean {
    const index = this.getLayerIndex(id);

    try {
      this.layers[index].setVisible(visible);
      return true;
    } catch (error) {
      return false;
    }
  }

  public moveUp(id: number): void {
    const index = this.getLayerIndex(id);
    const change = index - 1;

    if (!this.layers[index] || !this.layers[change])
      return;

    const tempA = this.layers[index];
    const tempB = this.layers[change];

    this.layers[index] = tempB;
    this.layers[change] = tempA;
  }

  public moveDown(id: number): void {
    const index = this.getLayerIndex(id);
    const change = index + 1;

    if (!this.layers[index] || !this.layers[change])
      return;

    const tempA = this.layers[index];
    const tempB = this.layers[change];

    this.layers[index] = tempB;
    this.layers[change] = tempA;
  }

  public getWidth(): number {
    return this.layersWidth;
  }

  public getHeight(): number {
    return this.layersHeight;
  }

  public getLastLayerId(): number {
    return this.lastLayerId;
  }
}
