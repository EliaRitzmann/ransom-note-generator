import sharp from "sharp";
const GIFEncoder = require('gifencoder');
const Canvas = require('canvas');
import fs from "fs";
import { BackgroundColor } from "../../types";
import { RansomNote } from "../RansomNote";

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
    const imageObj = await ransomNote.generateBuffer(text);

    let imageWidth: number = 0;
    let imageHeight: number = 0;

    await sharp(imageObj.imageBuffer)
      .metadata()
      .then(function (metadata) {
        imageWidth = metadata.width as number;
        imageHeight = metadata.height as number;
      });

    const resizedImage = await sharp(imageObj.imageBuffer)
      .resize(Math.floor(imageWidth * 0.1), Math.floor(imageHeight * 0.1))
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

  //output the resized images
  for (let i = 0; i < numberOfFrames; i++) {
    fs.writeFileSync(`test${i}.png`, resizedImages[i]);
  }

  // Create the gif
  const encoder = new GIFEncoder(maxImageWidth, maxImageHeight);
  const output = fs.createWriteStream("test.gif");
  encoder.pipe(output);

  encoder.start();

  // Loop through the input files.
resizedImages.forEach(async (data) => {
    // Create a new Canvas instance.
    const canvas = Canvas.createCanvas(maxImageWidth, maxImageHeight); // Change the dimensions as needed.
    const ctx = canvas.getContext('2d');

    // Create an ImageData instance from the raw RGBA buffer.
    const imageData = new Canvas.ImageData(
        new Uint8ClampedArray(data),
        canvas.width,
        canvas.height
    );

    // Put the ImageData instance into the canvas.
    ctx.putImageData(imageData, 0, 0);

    // Add the frame to the GIF.
    encoder.addFrame(ctx);
});


  return "test";
}
