import Color from "color";
import { RansomNote } from "../src";
import fs from "fs";

test("generateBufferStaticTest", async () => {
  const result = await RansomNote.generateImageBuffer("Hello World");
  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(Color({ r: 0, g: 0, b: 0 }).alpha(0));
  expect(result.options.spacing).toBe(0);
  expect(result.imageBuffer).toBeInstanceOf(Buffer);
});

test("generateRansomNoteBufferWithCustomOptionsStaticTest", async () => {
  const result = await RansomNote.generateImageBuffer("Hello World", {
    backgroundColor: Color({ r: 255, g: 0, b: 0 }).alpha(1),
    spacing: 50,
  });
  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(Color({ r: 255, g: 0, b: 0 }).alpha(1));
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
  expect(result.options.backgroundColor).toBe(Color({ r: 0, g: 0, b: 0 }).alpha(0));
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
      backgroundColor: Color({ r: 255, g: 0, b: 0 }).alpha(1),
      spacing: 40,
    }
  );
  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(Color({ r: 255, g: 0, b: 0 }).alpha(1));
  expect(result.options.spacing).toBe(40);
  expect(fs.existsSync(result.filePath)).toBe(true);

  //clean up
  fs.unlinkSync(result.filePath);
});
