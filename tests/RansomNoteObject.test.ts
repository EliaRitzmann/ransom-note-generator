import { BACKGROUND_COLOR, RansomNote } from "../src";
import fs from "fs";

let ransomNote: RansomNote;

beforeEach(() => {
  ransomNote = new RansomNote();
});

test("generateRansomNoteBufferObjectTest", async () => {
  const result = await ransomNote.generateImageBuffer("Hello World");

  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACKGROUND_COLOR.TRANSPARENT);
  expect(result.options.spacing).toBe(0);
  expect(result.imageBuffer).toBeInstanceOf(Buffer);
});

test("generateImageBufferWithCustomOptionsObjectTest", async () => {
  ransomNote = new RansomNote({
    backgroundColor: BACKGROUND_COLOR.RED,
    spacing: 50,
  });
  const result = await ransomNote.generateImageBuffer("Hello World");

  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACKGROUND_COLOR.RED);
  expect(result.options.spacing).toBe(50);
  expect(result.imageBuffer).toBeInstanceOf(Buffer);
});

test("generateAndSaveImageObjectTest", async () => {
  const result = await ransomNote.generateAndSaveImage(
    "Hello World JIMP",
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
  //fs.unlinkSync(result.filePath);
});

test("generateAndSaveImageWithCustomOptionsObjectTest", async () => {
  ransomNote = new RansomNote({
    backgroundColor: BACKGROUND_COLOR.BLACK,
    spacing: 40,
  });
  const result = await ransomNote.generateAndSaveImage(
    "Hello World",
    "./output"
  );

  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACKGROUND_COLOR.BLACK);
  expect(result.options.spacing).toBe(40);
  expect(fs.existsSync(result.filePath)).toBe(true);

  //clean up
  //fs.unlinkSync(result.filePath);
});
/*
test("generateGIFBufferObjectTest", async () => {
  const result = await ransomNote.generateGIFBuffer("Hello World", 4, 300);

  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACKGROUND_COLOR.TRANSPARENT);
  expect(result.options.spacing).toBe(0);
  expect(result.gifBuffer).toBeInstanceOf(Buffer);
});

test("generateGIFBufferWithCustomOptionsObjectTest", async () => {
  ransomNote = new RansomNote({
    backgroundColor: BACKGROUND_COLOR.RED,
    spacing: 50,
  });
  const result = await ransomNote.generateGIFBuffer("Hello GIF", 4, 300);

  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello GIF");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACKGROUND_COLOR.RED);
  expect(result.options.spacing).toBe(50);
  expect(result.gifBuffer).toBeInstanceOf(Buffer);
});

test("generateAndSaveGIFObjectTest", async () => {
  const result = await ransomNote.generateAndSaveGIF(
    "Hello GIF",
    "./output",
    4,
    300
  );

  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello GIF");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACKGROUND_COLOR.TRANSPARENT);
  expect(result.options.spacing).toBe(0);
  expect(fs.existsSync(result.filePath)).toBe(true);

  //clean up
  //fs.unlinkSync(result.filePath);
});

test("generateAndSaveGIFWithCustomOptionsObjectTest", async () => {
  ransomNote = new RansomNote({
    backgroundColor: BACKGROUND_COLOR.BLACK,
    spacing: 40,
  });
  const result = await ransomNote.generateAndSaveGIF(
    "Hello GIF",
    "./output",
    4,
    300
  );

  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello GIF");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACKGROUND_COLOR.BLACK);
  expect(result.options.spacing).toBe(40);
  expect(fs.existsSync(result.filePath)).toBe(true);

  //clean up
  //fs.unlinkSync(result.filePath);
});

*/
