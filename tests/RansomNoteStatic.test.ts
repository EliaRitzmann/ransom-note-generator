import { BACKGROUND_COLOR, RansomNote } from "../src";
import fs from "fs";

test("generateImageBufferStaticTest", async () => {
  const result = await RansomNote.generateImageBuffer("Hello World");
  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACKGROUND_COLOR.TRANSPARENT);
  expect(result.options.spacing).toBe(0);
  expect(result.imageBuffer).toBeInstanceOf(Buffer);
});

test("generateImageBufferWithCustomOptionsStaticTest", async () => {
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

test("generateAndSaveImageStaticTest", async () => {
  const result = await RansomNote.generateAndSaveImage(
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

test("generateAndSaveImageWithCustomOptionsStaticTest", async () => {
  const result = await RansomNote.generateAndSaveImage(
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

test("generateGIFBufferStaticTest", async () => {
  const result = await RansomNote.generateGIFBuffer("Hello World", 4, 300);
  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACKGROUND_COLOR.TRANSPARENT);
  expect(result.options.spacing).toBe(0);
  expect(result.gifBuffer).toBeInstanceOf(Buffer);
});

test("generateGIFBufferWithCustomOptionsStaticTest", async () => {
  const result = await RansomNote.generateGIFBuffer("Hello World", 4, 300, {
    backgroundColor: BACKGROUND_COLOR.RED,
    spacing: 50,
  });
  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACKGROUND_COLOR.RED);
  expect(result.options.spacing).toBe(50);
  expect(result.gifBuffer).toBeInstanceOf(Buffer);
});

test("generateAndSaveGIFStaticTest", async () => {
  const result = await RansomNote.generateAndSaveGIF(
    "Hello World",
    "./output",
    4,
    300
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

test("generateAndSaveGIFWithCustomOptionsStaticTest", async () => {
  const result = await RansomNote.generateAndSaveGIF(
    "Hello World",
    "./output",
    4,
    300,
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
