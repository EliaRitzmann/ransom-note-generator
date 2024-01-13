interface RansomNoteOptions {
  seed?: number;
  backgroundColor?: BackgroundColor;
  spacing?: number;
}

interface BackgroundColor {
    r: number;
    g: number;
    b: number;
    alpha: number;
  }

export { RansomNoteOptions, BackgroundColor };
