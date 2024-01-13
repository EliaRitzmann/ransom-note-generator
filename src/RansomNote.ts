import { BackgroundColor, RansomNoteOptions } from "../types";
import fs from "fs";
import { generateImage } from "./util/generateImage";
import { BACK_GROUND_COLOR } from "./util/BackgroundColor";

export class RansomNote {
  private seed: number;
  private backgroundColor: BackgroundColor;
  private spacing: number;

  public constructor({
    seed,
    backgroundColor,
    spacing,
  }: RansomNoteOptions = {}) {
    this.seed = seed || Math.floor(Math.random() * 1000000);
    this.backgroundColor = backgroundColor || BACK_GROUND_COLOR.TRANSPARENT;
    this.spacing = spacing || 0;
  }

  public async generateBuffer(
    text: string,
    { seed, backgroundColor, spacing }: RansomNoteOptions = {}
  ): Promise<{
    imageBuffer: Buffer;
    text: string;
    options: RansomNoteOptions;
  }> {
    const providedSeed = seed || this.seed;
    const providedBackgroundColor = backgroundColor || this.backgroundColor;
    const providedSpacing = spacing || this.spacing;

    const image = await generateImage(
      text,
      providedSeed,
      providedBackgroundColor,
      providedSpacing
    );

    return {
      imageBuffer: image,
      text,
      options: {
        seed: providedSeed,
        backgroundColor: providedBackgroundColor,
        spacing: providedSpacing,
      },
    };
  }

  public static async generateBuffer(
    text: string,
    {
      seed = Math.floor(Math.random() * 1000000),
      backgroundColor = BACK_GROUND_COLOR.TRANSPARENT,
      spacing = 0,
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

  public async generateAndSaveRansomNoteImage(
    text: string,
    outputFolder: string,
    { seed, backgroundColor, spacing }: RansomNoteOptions = {}
  ): Promise<{
    text: string;
    filePath: string;
    options: RansomNoteOptions;
  }> {
    const providedSeed = seed || this.seed;
    const providedBackgroundColor = backgroundColor || this.backgroundColor;
    const providedSpacing = spacing || this.spacing;

    const image = await generateImage(
      text,
      providedSeed,
      providedBackgroundColor,
      providedSpacing
    );
    //create output folder if it doesn't exist
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }

    //generate timestamp
    const timestamp = new Date().getTime();

    const filePath = outputFolder + "/" + text + timestamp + ".png";
    fs.writeFileSync(filePath, image);
    return {
      text,
      filePath,
      options: {
        seed: providedSeed,
        backgroundColor,
        spacing: providedSpacing,
      },
    };
  }

  public static async generateAndSaveRansomNoteImage(
    text: string,
    outputFolder: string,
    {
      seed = Math.floor(Math.random() * 1000000),
      backgroundColor = BACK_GROUND_COLOR.TRANSPARENT,
      spacing = 0,
    }: RansomNoteOptions = {}
  ): Promise<{
    text: string;
    filePath: string;
    options: RansomNoteOptions;
  }> {
    const image = await generateImage(text, seed, backgroundColor, spacing);
    //create output folder if it doesn't exist
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }

    //generate timestamp
    const timestamp = new Date().getTime();

    const filePath = outputFolder + "/" + text + timestamp + ".png";
    fs.writeFileSync(filePath, image);
    return {
      text,
      filePath,
      options: {
        seed,
        backgroundColor,
        spacing,
      },
    };
  }
}
