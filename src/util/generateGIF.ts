const { GifFrame, GifUtil, GifCodec } = require('gifwrap');
import { BackgroundColor } from "../../types";
import { RansomNote } from "../RansomNote";
import { Jimp } from "jimp";

export async function generateGIF(
  text: string,
  seed: number,
  backgroundColor: BackgroundColor,
  spacing: number,
  numberOfFrames: number,
  frameDelay: number
): Promise<Buffer> {
  const ransomNote = new RansomNote({
    seed: seed,
    backgroundColor: backgroundColor,
    spacing: spacing,
  });

  const jimpImages = []; // Explicitly type the images array

  let maxImageWidth: number = 0;
  let maxImageHeight: number = 0;

  // Generate the images and get the max width and height
  for (let i = 0; i < numberOfFrames; i++) {
    const imageObj = await ransomNote.generateImageBuffer(text, {
      backgroundColor: backgroundColor,
    });

    const jimpImage = await Jimp.fromBuffer(imageObj.imageBuffer);
    jimpImages.push(jimpImage);

    maxImageWidth = Math.max(maxImageWidth, jimpImage.bitmap.width);
    maxImageHeight = Math.max(maxImageHeight, jimpImage.bitmap.height);
  }

  const frames = []

  for (const jimpImage of jimpImages) {
    const gifFrame = new GifFrame(jimpImage.bitmap);

    frames.push(gifFrame);
  }

// create gif and return buffer
  const gif = GifUtil.createGif({
    width: maxImageWidth,
    height: maxImageHeight,
    frames: frames,
    delay: frameDelay,
    loop: 0,
    globalPalette: false,
  });
  const gifBuffer = await GifCodec.encode(gif);
  return gifBuffer;
}