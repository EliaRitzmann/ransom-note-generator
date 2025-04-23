import fs from "fs";
import path from "path";
import { BackgroundColor } from "../../types";
import { Jimp } from "jimp";

export async function generateImage(
  value: string,
  seed: number,
  backgroundColor: BackgroundColor,
  spacing: number
): Promise<Buffer> {
  if (!value) {
    throw new Error("Value must be provided");
  }

  if (!isValidSpacing(spacing)) {
    throw new Error("Spacing must be between -80 and 500");
  }

  const filePathsOrSpaces = await Promise.all(
    Array.from(value).map(async (char, index) =>
      char === " "
        ? " "
        : await getRandomImagePath(char.toLowerCase(), seed, index)
    )
  );

  filePathsOrSpaces.forEach((filePath) => {
    if (filePath !== " " && !fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
  });

  const image = await Promise.all(
    filePathsOrSpaces.map(async (filePath) =>
      filePath === " "
        ? new Jimp({
            width: 81 + spacing,
            height: 100,
            color: 0xffffffff,
          })
        : await Jimp.read(filePath).then((image) =>
            image.rotate(getRandomRotationAngle())
          )
    )
  );

  // find out the combined width of all images
  const maxHeight = Math.max(...image.map((img) => img.bitmap.height));

  const combinedWidth = image.reduce((acc, img) => acc + img.bitmap.width, 0);

  const baseImage = new Jimp({
    width: combinedWidth,
    height: maxHeight,
    color: 0xffffffff,
  });

  // Draw the images on the base image
  let xOffset = 0;
  for (const img of image) {
    baseImage.composite(img, xOffset, 0);
    xOffset += img.bitmap.width + spacing;
  }

  return baseImage.getBuffer("image/png", {
    quality: 50,
  });
}

async function getRandomImagePath(char: string, seed: number, index: number) {
  let dirPath: string;
  let files: string[];

  // Check for the existence of a file or directory specific to your development environment
  const isDevelopment = fs.existsSync(
    path.resolve(__dirname, "../../res/images/webp")
  );

  if (isDevelopment) {
    // Package when run from source
    dirPath = path.resolve(__dirname, "../../res/images/webp");
  } else {
    // Package when installed
    dirPath = path.resolve(__dirname, "../res/images/webp");
  }

  try {
    files = fs.readdirSync(dirPath);
    // Continue with your code using the files array
  } catch (error) {
    throw new Error(`Error reading directory: ${error}`);
  }

  // Find all files that start with the character
  const charFiles = files.filter(
    (file) => file.startsWith(`${char}-`) && file.endsWith(".png")
  );

  if (charFiles.length === 0) {
    throw new Error(`No files found for character: ${char}`);
  }

  // Modify the seed with the index to ensure different characters get different images
  const modifiedSeed = seed + index;
  const randomFile =
    charFiles[Math.floor(seededRandom(modifiedSeed) * charFiles.length)];

  return path.join(dirPath, randomFile);
}

function seededRandom(seed: number) {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function getRandomRotationAngle() {
  return Math.floor(Math.random() * 11) - 5; // Generates a random integer between -5 and 5
}

function isValidSpacing(spacing: number): boolean {
  return spacing >= -80 && spacing <= 500;
}
