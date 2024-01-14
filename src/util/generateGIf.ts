import sharp from "sharp";
const GIFEncoder = require("gifencoder");
const { createCanvas } = require("canvas");
import fs from "fs";
import { BackgroundColor } from "../../types";
import { RansomNote } from "../RansomNote";
import { Image, ImageData } from "canvas";

export async function generateGIf(
  text: string,
  seed: number,
  backgroundColor: BackgroundColor,
  spacing: number,
  numberOfFrames: number,
  frameDelay: number
): Promise<string> {
  const ransomNote = new RansomNote({
    seed: seed,
    backgroundColor: backgroundColor,
    spacing: spacing,
  });

  const images: Buffer[] = [];

  let maxImageWidth: number = 0;
  let maxImageHeight: number = 0;

  // Generate the images amd get the max width and height
  for (let i = 0; i < numberOfFrames; i++) {
    const imageObj = await ransomNote.generateBuffer(text, {backgroundColor: backgroundColor});

    let imageWidth: number = 0;
    let imageHeight: number = 0;

    await sharp(imageObj.imageBuffer)
      .metadata()
      .then(function (metadata) {
        imageWidth = metadata.width as number;
        imageHeight = metadata.height as number;
      });

    const resizedImage = await sharp(imageObj.imageBuffer)
      .resize(Math.floor(imageWidth * 0.5), Math.floor(imageHeight * 0.5))
      .toBuffer();

    await sharp(resizedImage)
      .metadata()
      .then(function (metadata) {
        if (metadata.width! > maxImageWidth)
          maxImageWidth = metadata.width as number;
        if (metadata.height! > maxImageHeight)
          maxImageHeight = metadata.height as number;
      });

    images.push(resizedImage);
  }

  // Resize the images to the max width and height
  const resizedImages: Buffer[] = [];
  for (let i = 0; i < numberOfFrames; i++) {
    const resizedImage = await sharp(images[i])
      .resize(maxImageWidth, maxImageHeight)
      .toBuffer();
    resizedImages.push(resizedImage);
  }

  const inputFiles = [];

  /*
  //output the resized images
  for (let i = 0; i < numberOfFrames; i++) {
    const outputPath = `test${i}.png`;
    fs.writeFileSync(outputPath, resizedImages[i]);
    inputFiles.push(outputPath);
  }
  */

  const encoder = new GIFEncoder(maxImageWidth, maxImageHeight);
  // stream the results as they are available into myanimated.gif
  encoder.createReadStream().pipe(fs.createWriteStream("myanimated.gif"));

  encoder.start();
  encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
  encoder.setDelay(frameDelay); // frame delay in ms
  encoder.setQuality(10); // image quality. 10 is default.
  encoder.setTransparent(0x000000)

  // use node-canvas
  const canvas = createCanvas(maxImageWidth, maxImageHeight);
  const ctx = canvas.getContext("2d");

  for (let i = 0; i < resizedImages.length; i++) {
    const image = new Image();
    image.src = resizedImages[i];
    ctx.drawImage(image, 0, 0);
    encoder.addFrame(ctx);
    ctx.clearRect(0, 0, maxImageWidth, maxImageHeight);
  }

  encoder.finish();

  return "test";
}
