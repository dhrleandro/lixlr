import ColorRgba from "./entities/ColorRgba";
import LayerManager from "./LayerManager";
import { ToolType } from "./tools/Type";

export interface AppState {
  scale: number,
  primaryColor: ColorRgba,
  secondaryColor: ColorRgba,
  selectedTool: ToolType,
  layers: LayerManager,
  selectedLayer: number
}
