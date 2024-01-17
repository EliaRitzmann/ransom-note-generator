import Color from "color";
import { generateImage } from "../src/util/generateImage";

test("generateImageTest", async () => {
  const result = await generateImage(
    "Transparent",
    123,
    new Color({ r: 0, g: 0, b: 0 }).alpha(0),
    10
  );
  expect(result).toBeInstanceOf(Buffer);
});

test("generateImageWithInvalidTextTest", async () => {
  await expect(async () => {
    await generateImage(
      "Hello World!",
      123,
      new Color({ r: 0, g: 0, b: 0 }).alpha(0),
      10
    );
  }).rejects.toThrow(new Error("No files found for character: !"));
});
