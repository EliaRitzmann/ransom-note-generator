import { BACK_GROUND_COLOR } from "../src/util/BackgroundColor";
import { generateImage } from "../src/util/generateImage";

test("generateImageTest", async () => {
  const result = await generateImage(
    "Hello World",
    123,
    BACK_GROUND_COLOR.TRANSPARENT,
    10
  );
  expect(result).not.toBe(123);
  expect(result).toBeInstanceOf(Buffer);
});
