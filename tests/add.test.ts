import {
  generateRansomNoteBuffer,
  generateAndSaveRansomNoteImage,
} from "../src";
import fs from "fs";

test("generateRansomNoteBufferTest", async () => {
  const result = await generateRansomNoteBuffer("Hello World");
  expect(result.imageBuffer).toBeInstanceOf(Buffer);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe("transparent");
  expect(result.options.spacing).toBe(10);
});

test("generateAndSaveRansomNoteImageTest", async () => {
  const path = "./output";
  const result = await generateAndSaveRansomNoteImage("Hello World", path);
  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe("transparent");
  expect(result.options.spacing).toBe(10);
  expect(
    fs.existsSync(path + "/Hello World" + result.options.seed + ".png")
  ).toBe(true);

  //clean up
  fs.unlinkSync(path + "/Hello World" + result.options.seed + ".png");
});
