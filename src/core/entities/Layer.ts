import Pixel from "./Pixel";

type RGBA = {
  red: number,
  green: number,
  blue: number,
  alpha: number
}

export default class Layer {

  private pixels: ImageData;
  private width: number;
  private height: number;
  private visible: boolean;
  private name: string;
  private id: number;

  constructor(pixels: ImageData, id: number, name: string, width: number, height: number, visible: boolean = true) {
    this.pixels = new ImageData(pixels.data, pixels.width, pixels.height);
    this.width = width;
    this.height = height;
    this.visible = visible;
    this.name = name;
    this.id = id;
  }

  get data(): ImageData {
    return this.pixels;
  }

  private setImageDataPixel = (imageData: ImageData, pixel: Pixel): ImageData => {
    const red = pixel.y * (imageData.width * 4) + pixel.x * 4;
    const green = red + 1;
    const blue = red + 2;
    const alpha = red + 3;

    const colorRgb = pixel.getColorRgb();
    imageData.data[red] = colorRgb.red;
    imageData.data[green] = colorRgb.green;
    imageData.data[blue] = colorRgb.blue;
    imageData.data[alpha] = 255;

    return imageData;
  };

  private getImageDataColor = (imageData: ImageData, x: number, y: number): RGBA => {
    const red = y * (imageData.width * 4) + x * 4;
    const green = red + 1;
    const blue = red + 2;
    const alpha = red + 3;

    return {
      red: imageData.data[red],
      green: imageData.data[green],
      blue: imageData.data[blue],
      alpha: imageData.data[alpha]
    };
  };

  public render(): ImageData {
    return this.pixels;
  }

  public setImageData(imageData: ImageData): void {
    this.pixels = new ImageData(imageData.data, imageData.width, imageData.height);
  }

  public setVisible(visible: boolean) {
    this.visible = visible;
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public getName(): string {
    return this.name;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }
}
