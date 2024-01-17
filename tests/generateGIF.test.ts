import Color from "color";
import { generateGIF } from "../src/util/generateGIF";
import fs from "fs";

test("generateGIFTest", async () => {
  const result = await generateGIF(
    "Hello World",
    123,
    new Color({ r: 0, g: 0, b: 0 }).alpha(0),
    10,
    4,
    300
  );

  fs.writeFileSync("output/test.gif", result);

  expect(result).toBeInstanceOf(Buffer);
});

test("generateGIFWithInvalidTextTest", async () => {
  await expect(async () => {
    await generateGIF(
      "Hello World!",
      123,
      new Color({ r: 0, g: 0, b: 0 }).alpha(0),
      10,
      4,
      300
    );
  }).rejects.toThrow(new Error("No files found for character: !"));
});
