import { BACK_GROUND_COLOR, RansomNote } from "../src";
import fs from "fs";

let ransomNote: RansomNote;

beforeEach(() => {
  ransomNote = new RansomNote();
});

test("generateRansomNoteBufferObjectTest", async () => {
  const result = await ransomNote.generateBuffer("Hello World");

  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACK_GROUND_COLOR.TRANSPARENT);
  expect(result.options.spacing).toBe(0);
  expect(result.imageBuffer).toBeInstanceOf(Buffer);
});

test("generateRansomNoteBufferWithCustomOptionsObjectTest", async () => {
  ransomNote = new RansomNote({
    backgroundColor: BACK_GROUND_COLOR.RED,
    spacing: 50,
  });
  const result = await ransomNote.generateBuffer("Hello World");

  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACK_GROUND_COLOR.RED);
  expect(result.options.spacing).toBe(50);
  expect(result.imageBuffer).toBeInstanceOf(Buffer);
});

test("generateAndSaveRansomNoteImageObjectTest", async () => {
  const result = await ransomNote.generateAndSaveRansomNoteImage(
    "Hello World",
    "./output"
  );

  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACK_GROUND_COLOR.TRANSPARENT);
  expect(result.options.spacing).toBe(0);
  expect(fs.existsSync(result.filePath)).toBe(true);

  //clean up
  fs.unlinkSync(result.filePath);
});

test("generateAndSaveRansomNoteImageWithCustomOptionsObjectTest", async () => {
  ransomNote = new RansomNote({
    backgroundColor: BACK_GROUND_COLOR.BLACK,
    spacing: 40,
  });
  const result = await ransomNote.generateAndSaveRansomNoteImage(
    "Hello World",
    "./output"
  );

  expect(result).toBeInstanceOf(Object);
  expect(result.text).toBe("Hello World");
  expect(result.options).toBeInstanceOf(Object);
  expect(typeof result.options.seed).toBe("number");
  expect(result.options.backgroundColor).toBe(BACK_GROUND_COLOR.BLACK);
  expect(result.options.spacing).toBe(40);
  expect(fs.existsSync(result.filePath)).toBe(true);

  //clean up
  fs.unlinkSync(result.filePath);
});
