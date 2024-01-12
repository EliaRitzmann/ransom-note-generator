import { RansomNoteOptions } from "../types";
import fs from "fs";
import { generateImage } from "./util/getRansomNote";

async function generateRansomNoteBuffer(
  text: string,
  {
    seed = Math.floor(Math.random() * 1000000),
    backgroundColor = "transparent",
    spacing = 10,
  }: RansomNoteOptions = {}
): Promise<{
  imageBuffer: Buffer;
  text: string;
  options: RansomNoteOptions;
}> {
  const image = await generateImage(text, seed, backgroundColor, spacing);
  return {
    imageBuffer: image,
    text,
    options: {
      seed,
      backgroundColor,
      spacing,
    },
  };
}

async function generateAndSaveRansomNoteImage(
  text: string,
  outputFolder: string,
  {
    seed = Math.floor(Math.random() * 1000000),
    backgroundColor = "transparent",
    spacing = 10,
  }: RansomNoteOptions = {}
): Promise<{
  text: string;
  options: RansomNoteOptions;
}> {
  const image = await generateImage(text, seed, backgroundColor, spacing);
  fs.writeFileSync(outputFolder, image);
  return {
    text,
    options: {
      seed,
      backgroundColor,
      spacing,
    },
  };
}

export { generateRansomNoteBuffer, generateAndSaveRansomNoteImage };
