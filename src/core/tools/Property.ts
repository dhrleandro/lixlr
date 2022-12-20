import RGBA from "../entities/RGBA";

export enum ToolPropertyType {
  NUMBER = 'NUMBER',
  TEXT = 'STRING',
  COLOR = 'COLOR',
  // BRUSH = 'BRUSH'
}

export interface ToolProperty {
  type: ToolPropertyType;
  value: string | number | RGBA | undefined;
  minValue: number | undefined;
  maxValue: number | undefined;
}

export function createToolProperty(type: ToolPropertyType,
  value: (string | number | RGBA | undefined),
  minValue: (number | undefined) = undefined,
  maxValue: (number | undefined) = undefined): ToolProperty {

    return {
      type: type,
      value: value,
      minValue: minValue,
      maxValue: maxValue
    }
  }
