import ColorRgba from "./ColorRgba";
import Pixel from "./Pixel";

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

  public setImageDataPixel(pixel: Pixel): void {
    const red = pixel.y * (this.pixels.width * 4) + pixel.x * 4;
    const green = red + 1;
    const blue = red + 2;
    const alpha = red + 3;

    const ColorRgba = pixel.getColorRgba();
    this.pixels.data[red] = ColorRgba.red;
    this.pixels.data[green] = ColorRgba.green;
    this.pixels.data[blue] = ColorRgba.blue;
    this.pixels.data[alpha] = 255;
  };

  public getImageDataColor = (imageData: ImageData, x: number, y: number): ColorRgba => {
    const red = y * (imageData.width * 4) + x * 4;
    const green = red + 1;
    const blue = red + 2;
    const alpha = red + 3;

    const rgba = {
      red: imageData.data[red],
      green: imageData.data[green],
      blue: imageData.data[blue],
      alpha: imageData.data[alpha]
    };

    return new ColorRgba(rgba.red, rgba.green, rgba.blue, rgba.alpha);
  };

  public putPixel(x: number, y: number, rgba: ColorRgba) {
    this.setImageDataPixel(Pixel.createWidthRgba(x, y, rgba));
  }

  public removePixel(x: number, y: number) {
    const rgba = ColorRgba.create(0, 0, 0, 0);
    this.setImageDataPixel(Pixel.createWidthRgba(x, y, rgba));
  }

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
