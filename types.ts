interface RansomNoteOptions {
  seed?: number;
  backgroundColor?: BackgroundColor;
  spacing?: number;
}

interface RansomNoteResult {
  imageBuffer: Buffer;
  text: string;
  seed: number;
  backgroundColor: string;
  spacing: number;
}

type BackgroundColor = "black" | "white" | "transparent";

export { RansomNoteOptions, RansomNoteResult, BackgroundColor };
