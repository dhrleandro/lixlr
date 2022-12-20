import ColorRgb from "./entities/ColorRgb";
import LayerManager from "./LayerManager";
import { ToolType } from "./tools/Type";

export interface AppState {
  scale: number,
  primaryColor: ColorRgb,
  secondaryColor: ColorRgb,
  selectedTool: ToolType,
  layers: LayerManager,
  selectedLayer: number
}
