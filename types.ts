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

interface RansomNoteResult {
  imageBuffer: Buffer;
  text: string;
  seed: number;
  backgroundColor: string;
  spacing: number;
}

export { RansomNoteOptions, RansomNoteResult, BackgroundColor };
