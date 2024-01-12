import { RansomNoteOptions } from "../types";
import fs from "fs";
import { generateImage } from "./util/generateImage";
import path from "path";

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
  //create output folder if it doesn't exist
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }
  fs.writeFileSync(outputFolder + "/"+ text + seed + ".png", image);
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
