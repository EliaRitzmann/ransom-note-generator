import { BackgroundColor } from "../../types";

export const BACKGROUND_COLOR = {
  BLACK: { r: 0, g: 0, b: 0, alpha: 1 } as BackgroundColor,
  WHITE: { r: 255, g: 255, b: 255, alpha: 1 } as BackgroundColor,
  TRANSPARENT: { r: 0, g: 0, b: 0, alpha: 0 } as BackgroundColor,
  RED: { r: 255, g: 0, b: 0, alpha: 1 } as BackgroundColor,
  GREEN: { r: 0, g: 255, b: 0, alpha: 1 } as BackgroundColor,
  BLUE: { r: 0, g: 0, b: 255, alpha: 1 } as BackgroundColor,
  YELLOW: { r: 255, g: 255, b: 0, alpha: 1 } as BackgroundColor,
  PURPLE: { r: 128, g: 0, b: 128, alpha: 1 } as BackgroundColor,
} as const;
