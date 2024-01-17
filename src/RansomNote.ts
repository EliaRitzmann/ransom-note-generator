import { RansomNoteOptions } from "../types";
import fs from "fs";
import { generateImage } from "./util/generateImage";
import { generateGIF } from "./util/generateGIF";
import Color from "color";


export class RansomNote {
  private seed: number;
  private backgroundColor: Color;
  private spacing: number;

  public constructor({
    seed,
    backgroundColor,
    spacing,
  }: RansomNoteOptions = {}) {
    this.seed = seed || Math.floor(Math.random() * 1000000);
    this.backgroundColor = backgroundColor ||  new Color({r: 0, g: 0, b: 0}).alpha(0);
    this.spacing = spacing || 0;
  }

  public async generateImageBuffer(
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

  public static async generateImageBuffer(
    text: string,
    {
      seed = Math.floor(Math.random() * 1000000),
      backgroundColor = new Color({r: 0, g: 0, b: 0}).alpha(0),
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
        backgroundColor: providedBackgroundColor,
        spacing: providedSpacing,
      },
    };
  }

  public static async generateAndSaveRansomNoteImage(
    text: string,
    outputFolder: string,
    {
      seed = Math.floor(Math.random() * 1000000),
      backgroundColor = new Color({r: 0, g: 0, b: 0}).alpha(0),
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

  public async generateGIFBuffer(
    text: string,
    numberOfFrames: number,
    frameDelay: number,
    { seed, backgroundColor, spacing }: RansomNoteOptions = {}
  ): Promise<{
    gifBuffer: Buffer;
    text: string;
    options: RansomNoteOptions;
  }> {
    const providedSeed = seed || this.seed;
    const providedBackgroundColor = backgroundColor || this.backgroundColor;
    const providedSpacing = spacing || this.spacing;

    const gifBuffer = await generateGIF(
      text,
      providedSeed,
      providedBackgroundColor,
      providedSpacing,
      numberOfFrames,
      frameDelay
    );

    return {
      gifBuffer: gifBuffer,
      text,
      options: {
        seed: providedSeed,
        backgroundColor: providedBackgroundColor,
        spacing: providedSpacing,
      },
    };
  }

  public static async generateGIFBuffer(
    text: string,
    numberOfFrames: number,
    frameDelay: number,
    {
      seed = Math.floor(Math.random() * 1000000),
      backgroundColor = new Color({r: 0, g: 0, b: 0}).alpha(0),
      spacing = 0,
    }: RansomNoteOptions = {}
  ): Promise<{
    gifBuffer: Buffer;
    text: string;
    options: RansomNoteOptions;
  }> {
    const gifBuffer = await generateGIF(
      text,
      seed,
      backgroundColor,
      spacing,
      numberOfFrames,
      frameDelay
    );
    return {
      gifBuffer: gifBuffer,
      text,
      options: {
        seed,
        backgroundColor,
        spacing,
      },
    };
  }

  public async generateAndSaveRansomNoteGif(
    text: string,
    outputFolder: string,
    numberOfFrames: number,
    frameDelay: number,
    {
      seed = Math.floor(Math.random() * 1000000),
      backgroundColor = new Color({r: 0, g: 0, b: 0}).alpha(0),
      spacing = 0,
    }: RansomNoteOptions = {}
  ): Promise<{
    text: string;
    filePath: string;
    options: RansomNoteOptions;
  }> {
    const providedSeed = seed || this.seed;
    const providedBackgroundColor = backgroundColor || this.backgroundColor;
    const providedSpacing = spacing || this.spacing;

    const gifBuffer = await generateGIF(
      text,
      providedSeed,
      providedBackgroundColor,
      providedSpacing,
      numberOfFrames,
      frameDelay
    );
    //create output folder if it doesn't exist
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }

    //generate timestamp
    const timestamp = new Date().getTime();

    const filePath = outputFolder + "/" + text + timestamp + ".gif";
    fs.writeFileSync(filePath, gifBuffer);

    return {
      text: "",
      filePath: "",
      options: {
        seed: providedSeed,
        backgroundColor: providedBackgroundColor,
        spacing: providedSpacing,
      },
    };
  }

  public static async generateAndSaveRansomNoteGif(
    text: string,
    outputFolder: string,
    numberOfFrames: number,
    frameDelay: number,
    {
      seed = Math.floor(Math.random() * 1000000),
      backgroundColor = new Color({r: 0, g: 0, b: 0}).alpha(0),
      spacing = 0,
    }: RansomNoteOptions = {}
  ): Promise<{
    text: string;
    filePath: string;
    options: RansomNoteOptions;
  }> {
    const gifBuffer = await generateGIF(
      text,
      seed,
      backgroundColor,
      spacing,
      numberOfFrames,
      frameDelay
    );
    //create output folder if it doesn't exist
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }

    //generate timestamp
    const timestamp = new Date().getTime();

    const filePath = outputFolder + "/" + text + timestamp + ".gif";
    fs.writeFileSync(filePath, gifBuffer);

    return {
      text: "",
      filePath: "",
      options: {
        seed,
        backgroundColor,
        spacing,
      },
    };
  }
}
