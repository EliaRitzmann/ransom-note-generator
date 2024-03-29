import { BACKGROUND_COLOR } from "../src";
import { generateGIF } from "../src/util/generateGIF";
import fs from "fs";

test("generateGIFTest", async () => {
  const result = await generateGIF(
    "Ransom Note",
    123,
    BACKGROUND_COLOR.TRANSPARENT,
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
      BACKGROUND_COLOR.TRANSPARENT,
      10,
      4,
      300
    );
  }).rejects.toThrow(new Error("No files found for character: !"));
});
