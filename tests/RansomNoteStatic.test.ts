import { BACKGROUND_COLOR, RansomNote } from "../src";
import fs from "fs";

test("generateBufferStaticTest", async () => {
  const result = await RansomNote.generateImageBuffer("Hello World");
  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACKGROUND_COLOR.TRANSPARENT);
  expect(result.options.spacing).toBe(0);
  expect(result.imageBuffer).toBeInstanceOf(Buffer);
});

test("generateRansomNoteBufferWithCustomOptionsStaticTest", async () => {
  const result = await RansomNote.generateImageBuffer("Hello World", {
    backgroundColor: BACKGROUND_COLOR.RED,
    spacing: 50,
  });
  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACKGROUND_COLOR.RED);
  expect(result.options.spacing).toBe(50);
  expect(result.imageBuffer).toBeInstanceOf(Buffer);
});

test("generateAndSaveRansomNoteImageStaticTest", async () => {
  const result = await RansomNote.generateAndSaveRansomNoteImage(
    "Hello World",
    "./output"
  );
  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACKGROUND_COLOR.TRANSPARENT);
  expect(result.options.spacing).toBe(0);
  expect(fs.existsSync(result.filePath)).toBe(true);

  //clean up
  fs.unlinkSync(result.filePath);
});

test("generateAndSaveRansomNoteImageWithCustomOptionsStaticTest", async () => {
  const result = await RansomNote.generateAndSaveRansomNoteImage(
    "Hello World",
    "./output",
    {
      backgroundColor: BACKGROUND_COLOR.BLACK,
      spacing: 40,
    }
  );
  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACKGROUND_COLOR.BLACK);
  expect(result.options.spacing).toBe(40);
  expect(fs.existsSync(result.filePath)).toBe(true);

  //clean up
  fs.unlinkSync(result.filePath);
});
